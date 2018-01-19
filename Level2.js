var score;
var Level2 = {
	preload: function(){
			
			//other
			this.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
			//audio

			this.load.audio('pipeSound', 'audio/pipe.wav');
			this.load.audio('jump', 'audio/jump.wav');
			this.load.audio('stomp', 'audio/stomp.wav');
			this.load.audio('beep', 'audio/coin.wav');
			this.load.audio('gameover', 'audio/game_over.wav');
			this.load.audio('death', 'audio/death.wav');
			this.load.audio('spawn', 'audio/mushroom_spawn.wav');
			this.load.audio('powerup','audio/powerup.wav');


			//spritesheets
			this.load.spritesheet('charmeleon', 'assets/charmeleon1.png',22,23);
			this.load.image('heart','assets/8bit-heart.png',7,7);
			this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/magikarp.png', 27, 24);
			this.load.spritesheet('realgoomba' , 'assets/goomba.png', 16,16);
			this.load.spritesheet('mario', 'assets/charmander1.png', 21, 19);
			this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
			this.load.tilemap('newlevel', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create: function(){

			playing = false;
			var message = "Oh god... I'm surrounded...";
			var textObject = game.add.bitmapText(30, 70, 'nokia', message, 13);
			displayLetterByLetterText(textObject, message);
		 	game.time.events.add(Phaser.Timer.SECOND*8, function() {
					textObject.destroy();
				});
			death = game.add.audio('death');
			theme = game.add.audio('pokemon1');
			beep = game.add.audio('beep');							
			stomp = game.add.audio('stomp');
			game_over = game.add.audio('gameover');
			jump = game.add.audio('jump');
			spawn = game.add.audio('spawn');
			powerup = game.add.audio('powerup');
			pipeSound = game.add.audio('pipeSound');
		
			death.volume = 0.3;
			beep.volume = 0.3;
			stomp.volume = 0.3;
			jump.volume = 0.3;
			powerup.volume = 0.3;
			pipeSound.volume = 0.3;
			

			Phaser.Canvas.setImageRenderingCrisp(game.canvas);
			game.scale.setGameSize(290,240);

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#5c94fc';
			



			map = game.add.tilemap('newlevel');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
	

			map.createLayer('background');


			layer = map.createLayer('solid');
			layer.resizeWorld();



			



			coins = game.add.group();
			coins.enableBody = true;											//stuff for coins
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 0, 0, 1, 2 ], 5, true);											//changed the animations to better give the feeling that its "shining"
			coins.callAll('animations.play', 'animations', 'spin');

			shopkeeper = game.add.group();
			shopkeeper.enableBody = true;
			map.createFromTiles(1,null,'realgoomba','shopkeeper',shopkeeper);
			shopText = game.add.bitmapText(1950, 150, 'nokia', 'SHOP' , 10);								//use bitmaptext to make text less blurry. 
			shopText2 = game.add.bitmapText(1920, 170, 'nokia', 'Super rare pokemon' , 10);
			shopText3 = game.add.bitmapText(1935,180,'nokia', 'only ' + score + ' pokeballs', 10);






			goombas = game.add.group();													//stuff for goombas
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 , 2],
					20, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -15);
			goombas.setAll('body.gravity.y', 500);

			
			
			

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.setSize(10,18,5);																//due to the non-symmetrical body of charmander and it's bigger size,  the hitbox is all over the place
			player.body.gravity.y = 370;																//hitbox is still weird sometimes but adding this change temporarily to bring it closer to marios
			player.body.collideWorldBounds = true;																
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 5, 6, 7 ], 10, true);									
			player.goesRight = true;																			 
																											   
	
			


			game.camera.follow(player);

			heart = game.add.image(70.5,3,'heart');heart.scale.setTo(0.1,0.1);									//this is lives.
			heartText = game.add.bitmapText(93,7,'nokia','x'+lives,10);
			heartText.fixedToCamera=true;
			heart.fixedToCamera = true;
			


			


			coinText = game.add.image(2,-10,'coin'); coinText.scale.setTo(2.2,2.2);
			coinText.fixedToCamera = true;
			scoreText = game.add.bitmapText(30, 7, 'nokia', 'x'+score , 10);								//use bitmaptext to make text less blurry. 
			scoreText.fixedToCamera = true;
																					
			cursors = game.input.keyboard.createCursorKeys();

	},

	update: function() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, coins,  coinOverlap);
			game.physics.arcade.overlap(player,shopkeeper,shopkeeperOverlap);
			if (player.alpha==1){
				game.physics.arcade.overlap(player, goombas, magikarpOverlap);
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
