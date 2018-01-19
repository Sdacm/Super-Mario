var Credits = {
	preload: function(){
	},

	create: function(){ 
		
		endtheme = game.add.audio('endtheme');
		endtheme.play();
		game.stage.backgroundColor = '#000000';
		game.scale.setGameSize(3000,2500);
		end1 = game.add.bitmapText(250, 800, 'nokia', 'Charmanders adventures ended in poverty...' , 125);
		end2 = game.add.bitmapText(1200, 3000, 'nokia', 'CREDITS' , 150);
		end3 = game.add.bitmapText(250, 3500, 'nokia' , 'All characters and tiles belong to Nintendo', 125);
		end5 = game.add.bitmapText(250,4400, 'nokia', 'No pokemon were hurt in the making of this game', 100);
		end4 = game.add.bitmapText(250, 3700, 'nokia' , 'Special thanks to Kittlia for the menu art ', 125);
		end6 = game.add.bitmapText(250,3900, 'nokia' , 'Credits to Bakanneki , Southern-island , MiCklart14 for the art used',75);
		end7 = game.add.bitmapText(1200, 5000, 'nokia', 'Starring:',150);
		end8 = game.add.bitmapText(1200,5500,'nokia', 'Charmander',125);
		end9 = game.add.bitmapText(1200,5600,'nokia', 'Squirtle',125);
		end15 = game.add.bitmapText(1200,5700,'nokia', 'Super mario clouds',125);
		end10 = game.add.bitmapText(1200,5800,'nokia', 'Lots of Magikarps',125);
		end11 = game.add.bitmapText(1200,6500,'nokia', 'Not starring:' , 150);
		end12 = game.add.bitmapText(1200,7100,'nokia', 'Bulbasaur', 125);
		end14 = game.add.bitmapText(1200,7200,'nokia', '802 other pokemon as of 2018', 100);
		end13 = game.add.bitmapText(1200,7300,'nokia', 'Goku', 125);
		f1 = game.add.bitmapText(1200, 7700 , 'nokia' , 'Songs used:' , 150);
		f2 = game.add.bitmapText(1200, 8200 , 'nokia' , 'Undertale - Dogsong', 125);
		f3 = game.add.bitmapText(1200, 8400 , 'nokia' , 'Pokemon xy - route 1 ost', 125);
		f4 = game.add.bitmapText(1200,8600 , 'nokia', 'The magikarp song' , 125);
		f5 = game.add.bitmapText(1000, 9000 , 'nokia', 'Not upcoming sequel: Super Bulbasaur adventures',75);
},
	update: function(){

		end1.position.y = end1.position.y-8;
		end2.position.y = end2.position.y-8;
		end3.position.y = end3.position.y-8;
		end4.position.y = end4.position.y-8;
		end5.position.y = end5.position.y-8;
		end6.position.y = end6.position.y-8;
		end7.position.y = end7.position.y-8;
		end8.position.y = end8.position.y-8;
		end9.position.y = end9.position.y-8;
		end10.position.y = end10.position.y-8;
		end11.position.y = end11.position.y-8;
		end12.position.y = end12.position.y-8;
		end13.position.y = end13.position.y-8;
		end14.position.y = end14.position.y-8;
		end15.position.y = end15.position.y-8;
		f1.position.y = f1.position.y-8;
		f2.position.y = f2.position.y-8;
		f3.position.y = f3.position.y-8;
		f4.position.y = f4.position.y-8;
		f5.position.y = f5.position.y-8;
	}

}
