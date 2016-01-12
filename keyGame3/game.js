//this function creates div. returning its instance
//0:empty,1:brick,2:player,3:keyr,4:gater,
//kljucevi 3,5,7,
//vrata 4,6,8
map=[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,2,0,0,0,0,1,5,0,1,7,0,1,5,1,7,0,0,0,1],
	[1,0,1,0,0,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1],
	[1,0,0,1,0,0,4,0,0,1,0,0,1,0,0,6,0,1,0,1],
	[1,0,0,0,3,0,1,0,0,0,0,1,1,4,1,1,0,0,0,1],
	[1,1,1,1,1,1,1,8,1,1,1,1,1,0,1,1,0,0,0,1],
	[1,3,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1,1,1],
	[1,1,1,0,0,0,1,0,1,0,0,1,0,0,1,1,0,0,3,1],
	[1,7,1,1,0,1,1,0,1,1,0,4,0,1,0,0,0,0,0,1],
	[1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1],
	[1,0,0,1,0,1,1,1,1,1,1,1,8,1,1,1,1,3,1,1],
	[1,0,1,1,0,1,3,5,7,0,0,0,0,0,0,0,1,6,1,1],
	[1,0,1,1,0,8,0,0,0,0,1,1,1,1,0,1,0,0,0,1],
	[1,0,1,1,0,1,6,1,1,1,1,1,1,1,0,0,0,1,0,1],
	[1,0,0,0,0,1,0,0,8,0,0,4,0,5,1,0,1,1,1,1],
	[1,1,1,1,1,1,3,7,1,5,3,1,0,0,0,0,8,6,4,9],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
function createDiv(x,y,image)
{
	var iDiv = document.createElement('div');
			iDiv.id = 'block';
			iDiv.className = 'noselect';
			iDiv.style.backgroundImage = "url("+image+")";
			iDiv.style.height=50;
			iDiv.style.width=50; 
			iDiv.style.marginLeft=x;
			iDiv.style.marginTop=y;
			iDiv.style.position='absolute'
			document.getElementsByTagName('body')[0].appendChild(iDiv);
			return iDiv;

}
//bricks in level
bricks=[];
//cordinates for key
keys=[];
//cordinates for gate
gates=[];
//it gets true when player finds key
gotKey=false;
player=null;
goal=null;

infobar=[];
direction=null;
function createBrick(x , y)
{
	createDiv(x,y,'brick.jpg');
}
function startGame() {
			//adding background
			var iDiv = document.createElement('div');
			iDiv.id = 'block';
			iDiv.className = 'noselect';
			iDiv.style.backgroundImage = "url('background.jpg')";
			iDiv.style.height=window.innerHeight;
			iDiv.style.width=window.innerWidth;; 
			iDiv.style.marginLeft=0;
			iDiv.style.marginTop=0;
			iDiv.style.position='absolute'
			document.getElementsByTagName('body')[0].appendChild(iDiv);
			document.getElementsByTagName('body')[0].onclick=clickControl;

			infobar=[createDiv(50,6,'keyr.png'),
			createDiv(100,6,'keyb.png'),
			createDiv(150,6,'keyg.png')];
			infobar.forEach(function(e){e.style.position='fixed';
			e.style.zIndex= 1;});
			//disable scroll
			//document.getElementsByTagName('body')[0].style.overflow='hidden';
			//creating player
			//adding players sprite
			
			bricks=[];
			var ix=50;
			var iy=50;
			var maxx=0;
			map.forEach(function(e)
			{
				e.forEach(function(ee)
				{
					if(ee==1)
					{
					bricks.push({x:ix,y:iy,div: createBrick(ix,iy)});
					}
					if(ee==2)
					{
					player={x:ix,y:iy,sx:0,sy:0,kr:0,kb:0,kg:0,div: createDiv(ix,iy,'char.png')};
					}
					if(ee==3)
					{
					keys.push({x:ix,y:iy,t:1,div: createDiv(ix,iy,'keyr.png')});
					}
					if(ee==4)
					{
					gates.push({x:ix,y:iy,t:1,div:createDiv(ix,iy,'gatecr.png')});
					}
					if(ee==5)
					{
					keys.push({x:ix,y:iy,t:2,div: createDiv(ix,iy,'keyb.png')});
					}
					if(ee==6)
					{
					gates.push({x:ix,y:iy,t:2,div:createDiv(ix,iy,'gatecb.png')});
					}
					if(ee==7)
					{
					keys.push({x:ix,y:iy,t:3,div: createDiv(ix,iy,'keyg.png')});
					}
					if(ee==8)
					{
					gates.push({x:ix,y:iy,t:3,div:createDiv(ix,iy,'gatecg.png')});
					}
					if(ee==9)
					{
					goal={x:ix,y:iy,div:createDiv(ix,iy,'charf.png')};
					}
					
					ix+=50;
				}
				)
				if(maxx<ix)maxx=ix;
				iy+=50;
				ix=50;
			}
			)
			iDiv.style.height=iy+50;
			iDiv.style.width=maxx+50; 
		updateInfo();
			
        }
function colide(a,b)
{
//tests if a and b are colliding
if(Math.abs(a.x-b.x)<50)
	{
	if(Math.abs(a.y-b.y)<50)
		{
				return true;
		}
	}
return false;
}

function clickControl(e)
{
if(direction) {direction=null;stop(); return;}
direction={x:Math.round((Math.round(e.x/50)*50-document.player.x)/10)*10,y:Math.round((Math.round(e.y/50)*50-document.player.y)/10)*10};



}
//function for moveing player
function moveBox(ev)
{
	if(ev.charCode==97)//left
	{
	player.sx=-10;
	}
	if(ev.charCode==115)//down
	{
	player.sy=10;
	}
	if(ev.charCode==119)//up
	{
	player.sy=-10;
	}
	if(ev.charCode==100)//right
	{
	player.sx=10;
	}
}

function updateInfo()
{

infobar[0].innerHTML=player.kr;
infobar[1].innerHTML=player.kb;
infobar[2].innerHTML=player.kg;
}


//function that runs game cycle
function update()
{
if(direction){
	stop();
		if(Math.abs(direction.x)>Math.abs(direction.y))
		{
		if(direction.x>0){ moveBox({charCode:100});direction.x-=10;}
		else if ((direction.x<-0)){moveBox({charCode:97});direction.x+=10}
		else direction=null;
		}
		else
		{
		if(direction.y>0) {moveBox({charCode:115});direction.y-=10;}
		else if (direction.y<-0){moveBox({charCode:119});direction.y+=10;}
		else direction=null;
		}
	
	}
//new proposed position
var posn={
x:player.x+player.sx,
y:player.y+player.sy}
;

bricks.forEach(function(e)
			{
				if(colide(posn,e))
				{
				//if position is not free then new proposition is not to move
						posn.y=player.y;
						posn.x=player.x; 
				}
			});

//testing gate collision
gates.forEach(function(e)
	{
	if(colide(posn,e))
	{
				if((e.t==1&&player.kr>0)||
				(e.t==2&&player.kb>0)||
				(e.t==3&&player.kg>0))
				{
				//you use the key to open the gate
				
				e.div.style.backgroundImage="url('gateo.png')";
				//e.div.parentNode.removeChild(e.div);
				//gotKey=false;
				switch(e.t)
				{
				case 1: player.kr--; break;
				case 2: player.kb--; break;
				case 3: player.kg--; break;
				default: break;
				}
				updateInfo();
				e.t=-1;
				}
				else
				{
				if(e.t!=-1){
					//if gate is closed then you cant move trough
					posn.y=player.y;
					posn.x=player.x;
					}
				
				}
	}}
	);
keys.forEach(function(e){
if(colide(posn,e))
{
	if(e.t==-1)
		return;
	//taking key
	
	
	//moveing div
	e.div.parentNode.removeChild(e.div);
	switch(e.t)
		{
		case 1: player.kr++; break;
		case 2: player.kb++; break;
		case 3: player.kg++; break;
		default: break;
		}
	e.t=-1;
	updateInfo();
	//gotKey=true;
}}
)

if(colide(player,goal)){alert("Congratulations you found king!");
					posn.y=150;
					posn.x=150;
}
//setting player to new proposed position (actually move)
player.y=posn.y;
player.x=posn.x; 


//test if player escaped
/*if(posn.y>450||posn.y<0||posn.x>450||posn.x<0) {
	alert("Congratulations you escaped the lamest prison :D \nBut you got cot! :/");
	//restarting to starting point
	gate.open=false;
	document.gGate.style.backgroundImage="url('gatec.png')";
	document.player={x:100,y:100, sx:0, sy: 0};
	key.x=300;
	key.y=100;
	document.gKey.style.marginTop=key.y-25;
	document.gKey.style.marginLeft=key.x-25;
	document.getElementsByTagName('body')[0].appendChild(document.gKey);
}*/
//setting players div to original position
player.div.style.marginTop=player.y;
player.div.style.marginLeft=player.x;
}
//when you rise press player stop
function stop()
{
	player.sx=0;
	player.sy=0;
};
//start the magic
window.onload = startGame;
//add controls
window.onkeypress=moveBox;
window.onkeyup=stop;
//set game interval that runs the magic
window.setInterval(update, 100);