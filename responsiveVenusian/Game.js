
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {
		this.world.setBounds(0, 0, 3000, 1000);
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.bg = this.add.image(this.game.width/2, this.game.height, 'starfield');
		this.bg.fixedToCamera=true;
		this.bg.anchor.set(0.5, 1);
		this.bg.scale.x=this.bg.scale.y=Math.max(this.game.width/this.bg.width,this.game.height/this.bg.height);
		this.physics.arcade.gravity.y = 100;
		this.sunian = this.add.sprite(0, 0, 'sunian');
		this.sunian.animations.add('walk',[1,2,3,4,5]);
		this.sunian.animations.add('stand',[0]);
		
		
		this.sunian.inputEnabled = true;
		this.sunian.events.onInputDown.add(function(){this.state.start('MainMenu');}, this);
		this.sunian.x = this.game.world.centerX;
	    this.sunian.y = 200;
		this.sunian.anchor.set(0.5, 0.5);
		this.physics.arcade.enable(this.sunian);
		this.sunian.body.collideWorldBounds = true;
		this.sunian.body.drag.set(10);
		this.sunian.body.maxVelocity.x=200;
		//this.sunian.body.mass=1;
		//this.sunian.body.setSize(60,80);
		
		this.rocks=this.add.physicsGroup(Phaser.Physics.ARCADE);
		this.rocks.enableBody=true;
		
		for(var i=0; i<30; i++){
			
		var ground=this.rocks.create(Math.floor(Math.random() * (this.world.width -200 + 1)) + 200,
		Math.floor(Math.random() * (this.world.height -300 + 1)) + 400, 'ground');
		ground.anchor.set(0.5, 0.5);
		ground.heightLevel= ground.y;
		ground.addon=null;
		
		ground.body.allowGravity = false;
		ground.body.setSize(110,10,0,-33);
		//ground.scale.y=ground.scale.x=Math.random()*2;
		ground.body.drag.set(200*ground.scale.x*ground.scale.x);
		ground.immovable = true;  
		//ground.body.mass=ground.scale.x*ground.scale.x;
		}
		this.rocks.setAll('maxVelocity', 50);
		this.rocks.setAll('minVelocity', -200);
		this.rocks.setAll('maxAcceleration', 10);
		this.rocks.setAll('body.collideWorldBounds', true);
		//this.rocks.setAll('body.bounce', 0.5);
	    //this.rocks.setAll('body.bounce.y', 1);
		//
		
		//this.ground.body.setCircle(28)
		//this.camera.follow(this.sunian);
		this.camera.follow(this.sunian, Phaser.Camera.FOLLOW_PLATFORMER);
    	this.style = 'STYLE_PLATFORMER'
		this.cursors = this.input.keyboard.createCursorKeys();

	},

	update: function () {
		//this.sunian.animations.play('stand');
		this.physics.arcade.collide(this.rocks, this.sunian,function(one , two){two.addon=one,one.platform=two;},null,this);
		this.physics.arcade.collide(this.rocks);
		this.sunian.body.acceleration.y=0;
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
	if (this.cursors.left.isDown)
    {
		if(this.sunian.animations.currentAnim.name!='walk')
			 this.sunian.animations.play('walk',7,true);
		if(this.sunian.body.touching.down)
        	this.sunian.body.acceleration.x = -120;
		else this.sunian.body.acceleration.x = -50;
		if(this.sunian.body.touching.left)
			this.sunian.body.acceleration.y=-130;
		if(this.sunian.scale.x>0)
			this.sunian.scale.x *= -1;
    }
    else if (this.cursors.right.isDown)
    {
		if(this.sunian.animations.currentAnim.name!='walk')
			 this.sunian.animations.play('walk',7,true);
		if(this.sunian.body.touching.down)
        	this.sunian.body.acceleration.x = 120;
		else this.sunian.body.acceleration.x = 50;
		if(this.sunian.body.touching.right)
			this.sunian.body.acceleration.y=-130;
		if(this.sunian.scale.x<0)
			this.sunian.scale.x *= -1;
    }
    else
    {
		if(this.sunian.animations.currentAnim.name!='stand')
			 this.sunian.animations.play('stand');
		this.sunian.body.acceleration.x=0;
		if(this.sunian.body.touching.down)
        	 this.sunian.body.velocity.x = 0;
    }
	if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
		if(this.sunian.body.touching.down)
			this.sunian.body.velocity.y=-160;
		else if(this.sunian.body.touching.left)
			{
				this.sunian.body.velocity.y=-100;
				this.sunian.body.velocity.x+=100;
			}
		else if(this.sunian.body.touching.right)
			{
				this.sunian.body.velocity.y=-100;
				this.sunian.body.velocity.x-=100;
			}
    }
	//if(this.sunian.y>this.game.height-100)
	//	this.sunian.body.acceleration.y= -150;
	//else this.sunian.body.acceleration.y= 0;
	this.rocks.forEach(function(item){
		if(Math.abs(item.heightLevel - item.y)>50)
			 item.body.acceleration.y=(item.heightLevel - item.y)*5.0;
		else {
			if(item.addon==null)
				item.body.acceleration.y=-item.body.velocity.y
			else{
				item.body.acceleration.y=(item.heightLevel+50 - item.y)*5.0+item.addon.body.acceleration.y/2;
				item.addon=null;
				}
			};
		});
	},
	

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
