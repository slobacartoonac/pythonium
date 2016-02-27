var game={boxses:[],score: 0,player:null,players:[],rocks:[],id:-1};

function mouseOverDo(e)
{
	game.mouse={x:e.pageX-this.offsetLeft,y:e.pageY-this.offsetTop};
	if(game.player!=null)
	{ 
		game.player.mouse=true;
	    game.player.toBe={x: Math.min(game.mouse.x,600), y: Math.min(game.mouse.y,600)};
	}
};

function createBlackBox(x,y,sx,sy)
{
	var newBox=createBox(x,y,sx,sy);
	newBox.style.backgroundColor='black';
	return newBox;
}
var someRechargeConstant=0;
function recharge()
{	
	someRechargeConstant++;
	if(game.player==null||game.player.recharge>7||someRechargeConstant<0) return;
	game.player.recharge++;
	game.conection.updateEnemyLabel();
}
setInterval(recharge,500);
function mouseClickDo(e)
{
	//for latter
	if(game.player==null) return;
	if(game.player.recharge==1){
		someRechargeConstant=-2;
		}
	if(game.player.recharge>0){
	game.conection.send({e:'shoot',x:game.player.x,y:game.player.y-30,id:game.player.id});
	createShoot(game.player.x,game.player.y-30);
	game.player.recharge--;
	game.conection.updateEnemyLabel() ;
	}
	
};
function createShoot(ix,iy)
{
	var shot =createBox(ix-10,iy-10,20,20);
	shot.style.backgroundImage="url('shoot.png')"
	
	game.boxses.push({x:ix,y:iy, div:shot});
}
function createRock(msg)
{
	msg.r=25;
	msg.div =createBox(msg.x-msg.r,msg.y-msg.r,msg.r*2,msg.r*2);
	msg.div.style.backgroundImage="url('rock3.png')"
	game.rocks.push(msg);
}
function createFire(msg)
{
	msg.r=25;
	msg.div =createBox(msg.x-msg.r,msg.y-msg.r,msg.r*2,msg.r*2);
	msg.div.style.backgroundImage="url('fireball.png')"
	game.rocks.push(msg);
}
function createGun(msg)
{
	msg.r=12;
	msg.div =createBox(msg.x-msg.r,msg.y-msg.r,msg.r*2,msg.r*2);
	msg.div.style.backgroundImage="url('enball.png')"
	game.rocks.push(msg);
}
function createEnemy()
{
	
}

function clearLevel()
{
	game.boxses.forEach(function (box)
	{
		removeObjct(box);
	});
	game.rocks.forEach(function (rock)
	{
		removeObjct(rock);
	});
	game.boxses=[];
	game.rocks=[];
}

//game.player={x:300, y:400 ,recharge: 10, div:createBox(300+15,400-50,30,50),remote:null,directionX:0,directionY:0,mouse:false};
//game.player.toBe={x:0, y: 0};

function update()
{
	var forRemove=[];
	var forRemoveR=[];
	game.boxses.forEach(function (box)
	{
		box.y-=15;
		box.div.style.marginTop=box.y-10
		if(box.y<-50)
			forRemove.push(box);
		else game.rocks.forEach(function (rock)
	{
		if(15+rock.r>Math.sqrt((box.x-rock.x)*(box.x-rock.x)+(box.y-rock.y)*(box.y-rock.y)))
				{
					forRemoveR.push(rock);
					forRemove.push(box);
				}
	});
	});
	game.rocks.forEach(function (rock)
	{
		rock.y+=rock.ys;
		rock.x+=rock.xs;
		rock.div.style.marginTop=rock.y-rock.r;
		rock.div.style.marginLeft=rock.x-rock.r;
		if(rock.y>600||rock.x>600||rock.x<0)
			forRemoveR.push(rock);
		else
			if(game.player!=null)
			{
				if(10+rock.r>Math.sqrt((game.player.x-rock.x)*(game.player.x-rock.x)+(game.player.y-rock.y)*(game.player.y-rock.y)))
				{
					game.conection.send({e:'dead'});
				}
			}
	});
	forRemove.forEach(function (box)
	{
		removeObjct(box);
	});
	forRemoveR.forEach(function (rock)
	{
		removeObjct(rock);
	});
	if(forRemove.length>0)
		game.boxses=game.boxses.filter(function (el) {
					return forRemove.indexOf(el) < 0;
		});
	if(forRemoveR.length>0)
		game.rocks=game.rocks.filter(function (el) {
					return forRemoveR.indexOf(el) < 0;
		});
	
	if(game.player!=null){
	if(game.player.mouse){
		if(game.player.x-5>game.player.toBe.x)game.player.x-=10;
		else if(game.player.x+5 < game.player.toBe.x) game.player.x+=10;
		
		if(game.player.y-5>game.player.toBe.y)game.player.y-=10;
		else if(game.player.y+5 <game.player.toBe.y) game.player.y+=10;
	}
	else
	{
	game.player.y+=game.player.directionY;
	game.player.x+=game.player.directionX;
	if(game.player.y>600)game.player.y=600;
	if(game.player.x>600)game.player.x=600;
	if(game.player.y<0)game.player.y=0;
	if(game.player.x<0)game.player.x=0;
	}
	
	//when we set name we set remote and start sending position
		//send position
	game.conection.send({e:'pos',x:game.player.x,y:game.player.y,id:game.player.id});
	}
		//go trough players and update there position on screen
	game.players.forEach(function(pler){
					if(!pler.div)return;
						pler.div.style.marginLeft=pler.x-15;
						pler.div.style.marginTop=pler.y-25;
					}
				);
};

function startGame()
{
	game.body=document.getElementById('container');
	game.body.onmousemove=mouseOverDo;
	game.body.onclick=mouseClickDo;
	game.body.style.width=600;
	game.body.style.height=800;
	game.body.style.backgroundColor='gray';
	//createBox(100,100,600,100).innerHTML="<h2>Now it is time to make server</h2>";
	game.playerBoard=createBox(30,30,200,400);
	game.playerBoard.style.color='#aa9999';
	game.playerBoard.style.zIndex=1000;
	//createRespondBox(100,100,600,200,"what's up?",function(e){alert(e)});
	window.setInterval(update,100);
	
	game.conection=Conect();
}

document.addEventListener('keydown', function(event) {
	if(game.player==null)return;
    if(event.keyCode == 37) {
	game.player.mouse=false;
       //left
	game.player.directionX=-10; 
    }
	else if(event.keyCode == 38) {
       //up
	game.player.mouse=false;
	game.player.directionY=-10; 
    }
    else if(event.keyCode == 39) {
		//right
	game.player.mouse=false;
	game.player.directionX=10; 
    }
	else if(event.keyCode == 40) {
        //down
	game.player.mouse=false;
	game.player.directionY=10; 
    }
	if(event.keyCode == 32||event.keyCode == 0){
		mouseClickDo({});
	}
});
document.addEventListener('keyup', function(event) {
	if(game.player==null)return;
    if(event.keyCode == 37) {
	game.player.directionX=0;
       //left
    }
	else if(event.keyCode == 38) {
       //up
	game.player.directionY=0;
    }
    else if(event.keyCode == 39) {
		//right
	game.player.directionX=0;
    }
	else if(event.keyCode == 40) {
        //down
	game.player.directionY=0;
    }
	if(event.keyCode == 32){

	}
});

window.onload=startGame;