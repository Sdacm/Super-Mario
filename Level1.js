var Level1 = {
	preload: function(){
			
			//other
			this.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
			//audio

			this.load.audio('pipeSound', 'audio/pipe.wav');
			this.load.audio('pokemon', 'audio/route1.mp3');
			this.load.audio('jump', 'audio/jump.wav');
			this.load.audio('stomp', 'audio/stomp.wav');
			this.load.audio('beep', 'audio/coin.wav');
			this.load.audio('gameover', 'audio/game_over.wav');
			this.load.audio('death', 'audio/death.wav');
			this.load.audio('spawn', 'audio/mushroom_spawn.wav');
			this.load.audio('powerup','audio/powerup.wav');


			//spritesheets
			this.load.spritesheet('charmeleon', 'assets/charmeleon1.png',22,23);
			this.load.spritesheet('mushbox', 'assets/mushbox.png', 16,16);
			this.load.image('heart','assets/8bit-heart.png',7,7);
			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/charmander1.png', 21, 19);
			this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
			this.load.spritesheet('mushroom','assets/mushroom.png',16,16);
			this.load.spritesheet('squirtle', 'assets/squirtle.png',21,16);

			this.load.tilemap('newlevel', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create: function(){

			//adding sounds to the game
			
			death = game.add.audio('death');
			theme = game.add.audio('pokemon');
			beep = game.add.audio('beep');							
			stomp = game.add.audio('stomp');
			game_over = game.add.audio('gameover');
			jump = game.add.audio('jump');
			spawn = game.add.audio('spawn');
			powerup = game.add.audio('powerup');
			pipeSound = game.add.audio('pipeSound');
			
			death.volume = 0.5;
			beep.volume = 0.5;
			stomp.volume = 0.5;
			jump.volume = 0.5;
			powerup.volume = 0.5;
			pipeSound.volume = 0.5;

			

			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.setGameSize(290,240);
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#5c94fc';
			



			map = game.add.tilemap('newlevel');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
			map.setCollisionBetween(3, 12, true, 'pipe');
			map.setCollisionBetween(3,12,true,'pipe2');

			map.createLayer('background');
			pipe = map.createLayer('pipe');
			pipe.resizeWorld();

			pipe2 =map.createLayer('pipe2');
			//pipe2.resizeWorld();

			layer = map.createLayer('solid');
			layer.resizeWorld();





			mushrooms = game.add.group();													//created mushbox group. These are the question block boxes that spawn mushrooms.
			mushrooms.enableBody = true;



			squirtle = game.add.group();																			//stuff for squirtle
			squirtle.enableBody=true;
			map.createFromTiles(1,null,'squirtle','squirtle',squirtle);
			squirtle.callAll('animations.add', 'animations', 'walkLeft', [ 0, 1 ],3 ,true);
			squirtle.callAll('animations.add', 'animations', 'walkRight',[ 2, 3 ],3, true);
			squirtle.callAll('animations.play', 'animations', 'walkRight');
			squirtle.setAll('body.bounce.x', 1);
			squirtle.setAll('body.velocity.x', 60);
			squirtle.setAll('body.gravity.y', 50);



			coins = game.add.group();
			coins.enableBody = true;											//stuff for coins
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 0, 0, 1, 2 ], 5, true);											//changed the animations to better give the feeling that its "shining"
			coins.callAll('animations.play', 'animations', 'spin');





			goombas = game.add.group();													//stuff for goombas
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);



			mushbox = game.add.group();																		
			mushbox.enableBody = true;
			map.createFromTiles(5,null,'mushbox','mushbox',mushbox);
			mushbox.callAll('animations.add', 'animations', 'glow', [0,1,2],3,true);
			mushbox.callAll('animations.play','animations','glow');
			mushbox.setAll('body.immovable',true);
			
			
			
			
			
			
			




			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.setSize(10,18,5);																//due to the non-symmetrical body of charmander and it's bigger size,  the hitbox is all over the place
			player.body.gravity.y = 370;																//hitbox is still weird sometimes but adding this change temporarily to bring it closer to marios
			player.body.collideWorldBounds = true;																
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 5, 6, 7 ], 10, true);
			player.animations.add('Teleport', [0,11,12,13,14],4,false);											
			player.goesRight = true;																			 
																											   
	
			theme.loopFull(0.6);


			game.camera.follow(player);

			heart = game.add.image(70.5,3,'heart');heart.scale.setTo(0.1,0.1);									//this is lives.
			heartText = game.add.bitmapText(93,7,'nokia','x'+lives,10);
			heartText.fixedToCamera=true;
			heart.fixedToCamera = true;
			


			


			coinText = game.add.image(2,-10,'coin'); coinText.scale.setTo(2.2,2.2);
			coinText.fixedToCamera = true;
			scoreText = game.add.bitmapText(30, 7, 'nokia', 'x0' , 10);								//use bitmaptext to make text less blurry. 
			scoreText.fixedToCamera = true;
			jokeText = game.add.bitmapText(2075,170,'nokia','Please dont feed',10);
																					
			cursors = game.input.keyboard.createCursorKeys();

	},

	update: function() {
			game.physics.arcade.collide(player,pipe,pipeOverlap);
			game.physics.arcade.collide(player,pipe2,endOfLevel);
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(squirtle,layer,squirtleBounce);
			game.physics.arcade.overlap(squirtle,goombas,waterdeathmachine);
			game.physics.arcade.overlap(player, coins,  coinOverlap);
			game.physics.arcade.collide(player,mushbox, mushboxOverlap);
			game.physics.arcade.collide(mushrooms,player,mushroomOverlap);								//check for collisions between player and mushbox.
			if (player.alpha==1){
				game.physics.arcade.overlap(player, goombas, goombaOverlap);
				game.physics.arcade.overlap(player,squirtle,squirtleOverlap);
			}


			if (player.body.enable && playing) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) { 
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;

				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {	
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 4;
				}

				if (cursors.up.isDown && player.body.onFloor()) {

					jump.play();

					player.body.velocity.y = -190;
					player.animations.stop();
					
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 9;
					else
						player.frame = 8;


				}
			}
	}
}
