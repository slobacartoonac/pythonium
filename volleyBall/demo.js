(function() {
      
    var canvas = document.getElementById('bbdemo');
    
    var world = boxbox.createWorld(canvas, {debugDraw:false});
    
    player = world.createEntity({
        name: 'player',
        shape: 'circle',
        x: 5,
        y: 11,
        height: 0.8,
        width: 0.8,
        friction: .3,
        restitution: 0,
        color: 'blue',
        maxVelocityX: 10,
		maxVelocityY: 30
    });
	var scorep=0;
	var scorec=0;

    
    player.onKeydown(function(e) {
        
        if (this._destroyed) {
            return;
        }

        var i;
        var obj;
        var player = this;

        // determine what you're standing on
        var standingOn;
        var pos = this.position();
        standingOn=pos.y>12;
        
        // jump
        if (e.keyCode === 32 && standingOn) {
            this.applyImpulse(45);
            return false;
        }

        // when airborn movement is restricted
        var force = 90;
        if (!standingOn) {
            force = 0;
        }

        // move left
        if (e.keyCode === 37) {
            this.setForce('movement', force, 270);
            this.friction(.1);
            return false;
        }

        // move right
        if (e.keyCode === 39) {
            this.setForce('movement', force, 90);
            this.friction(.1);
            return false;
        }
        
    });
    
    player.onKeyup(function(e) {
        
        if (this._destroyed) {
            return;
        }
        
        // clear movement force on arrow keyup
        if (e.keyCode === 37 || e.keyCode === 39) {
            this.clearForce('movement');
            this.friction(3);
            return false;
        }
        
    });
    
    world.onRender(function(ctx) {
        
        // update camera position every draw
        var p = player.position();
        var c = this.camera();

                this.camera({x:0});

    });

    var groundTemplate = {
        name: 'ground',
        type: 'static',
        height: .2,
        color: 'green',
        borderColor: 'rgba(0, 100, 0, .5)',
        borderWidth: 3
    };

    world.createEntity(groundTemplate, {width: 20, x: 10, y: 13.22});
	world.createEntity(groundTemplate, {width: 20, x: 10, y: 0});
	world.createEntity(groundTemplate, {width: 0.2,height:15, x: 0, y: 7});
	world.createEntity(groundTemplate, {width: 0.2,height:15, x: 20, y: 7});
	world.createEntity(groundTemplate, {width: 0.2,height:5, x: 10, y: 12});
    

    // Car thing
    var wheelTemplate = {
        name: 'wheel',
        shape: 'circle',
        radius: 0.7,
        image: 'rock3.png',
		restitution: .6,
		density: .2,
		friction: .5,
		maxVelocityX: 10,
		maxVelocityY: 10,
        imageStretchToFit: true
    };
    var ball = world.createEntity(wheelTemplate, {x: 7, y:1});
	ball.onImpact(function()
	{
	var pos=ball.position();
	if(pos.y>12){
		ball.position({x:10, y:1});
		if(pos.x>10)
			scorep+=1;
		else
			scorec+=1;
		document.getElementById("score").innerHTML="Player: "+scorep+"</br>CPU: "+scorec;
		}
	});
	
	cpu = world.createEntity({
        name: 'cpu',
        shape: 'circle',
        x: 15,
        y: 11,
        height: 0.8,
        width: 0.8,
        friction: .3,
        restitution: 0,
        color: 'blue',
        maxVelocityX: 8,
		maxVelocityY: 30
    });
	setInterval(function()
	{
        var i;
        var obj;
        var standingOn;
        var pos = cpu.position();
		var bpos=ball.position();
		var direction=0;
        standingOn=pos.y>12;
        
		if(pos.x>bpos.x+1||pos.x>17)
		{
			direction=-1;
		}
		if(pos.x<bpos.x+0.4||pos.x<12)
		{
			if(direction==0)
			direction=+1;
		}
        // jump
        if (standingOn) {
			if(	Math.abs((pos.x-0.5)-bpos.x)<1.2&& bpos.y>8)
				cpu.applyImpulse(45);
        }

        // when airborn movement is restricted
        var force = 90;
        if (!standingOn) {
            force = force/=2;
        }

        // move left
        if (direction<0) {
            cpu.setForce('movement', force, 270);
            cpu.friction(.1);
            return false;
        }
        // move right
        if (direction>0) {
            cpu.setForce('movement', force, 90);
            cpu.friction(.1);
            return false;
			}
	
	}
	,100);
	
	
})();