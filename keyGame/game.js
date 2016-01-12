//this function creates div. returning its instance
function createDiv(x,y,image)
{
	var iDiv = document.createElement('div');
			iDiv.id = 'block';
			iDiv.className = 'noselect';
			iDiv.style.backgroundImage = "url("+image+")";
			iDiv.style.height=50;
			iDiv.style.width=50; 
			iDiv.style.marginLeft=x-25;
			iDiv.style.marginTop=y-25;
			iDiv.style.position='absolute'
			document.getElementsByTagName('body')[0].appendChild(iDiv);
			return iDiv;
}
//bricks in level
bricks=[{x:50,y:50},{x:100,y:50},{x:150,y:50},{x:200,y:50},{x:250,y:50},{x:300,y:50},{x:350,y:50},
		{x:50,y:100},{x:250,y:100},{x:350,y:100},
		{x:50,y:150},{x:250,y:150},{x:350,y:150},
		{x:50,y:200},{x:100,y:200},{x:200,y:200},{x:250,y:200},{x:350,y:200},
		{x:50,y:250},{x:100,y:250},{x:350,y:250},
		{x:50,y:300},{x:100,y:300},{x:200,y:300},{x:250,y:300},{x:300,y:300},{x:350,y:300},
		{x:50,y:350},{x:100,y:350},{x:200,y:350},{x:250,y:350},{x:300,y:350},{x:350,y:350},
		];
//cordinates for key
key={x:300,y:100};
//cordinates for gate
gate={x:150,y:350,open:false};
//it gets true when player finds key
gotKey=false;
direction=null;
function createBrick(x , y)
{
	createDiv(x,y,'brick.jpg');
}
function startGame() 
{
	//adding background
	var iDiv = document.createElement('div');
	iDiv.id = 'block';
	iDiv.className = 'noselect';
	iDiv.style.backgroundImage = "url('background.jpg')";
	iDiv.style.height=374;
	iDiv.style.width=374; 
	iDiv.style.marginLeft=12;
	iDiv.style.marginTop=12;
	iDiv.style.position='absolute'
	document.getElementsByTagName('body')[0].appendChild(iDiv);
	document.getElementsByTagName('body')[0].onclick=clickControl;


	//disable scroll
	document.getElementsByTagName('body')[0].style.overflow='hidden';
	//creating player
	document.player={x:100,y:100, sx:0, sy: 0};
	//adding players sprite
	document.iDiv=createDiv(document.player.x,document.player.y,'char.png');
	bricks.forEach(function(e)
	{	
		//adding bricks sprites
		createBrick(e.x,e.y);
	});
	//adding key sprite
	document.gKey=createDiv(key.x,key.y,'key.png');
	//adding gate sprite
	document.gGate=createDiv(gate.x,gate.y,'gatec.png');
			
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
	document.player.sx=-10;
	}
	if(ev.charCode==115)//down
	{
	document.player.sy=10;
	}
	if(ev.charCode==119)//up
	{
	document.player.sy=-10;
	}
	if(ev.charCode==100)//right
	{
	document.player.sx=10;
	}
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
		x:document.player.x+document.player.sx,
		y:document.player.y+document.player.sy}
	;

	bricks.forEach(function(e)
				{
					if(colide(posn,e))
					{
					//if position is not free then new proposition is not to move
							posn.y=document.player.y;
							posn.x=document.player.x; 
					}
				});
	//testing gate collision
	if(colide(posn,gate))
		{
			if(!gotKey)
			{
				if(!gate.open){
				//if gate is closed then you cant move trough
					posn.y=document.player.y;
					posn.x=document.player.x;
					}
			}
			else
			{
			//you use the key to open the gate
			gate.open=true;
			document.gGate.style.backgroundImage="url('gateo.png')";
			document.gKey.parentNode.removeChild(document.gKey);
			gotKey=false;
			}
		}
	if(colide(posn,key))
	{
	//taking key
		key.x=50;
		key.y=6;
		//moveing div
		document.gKey.style.marginTop=key.y-25;
		document.gKey.style.marginLeft=key.x-25;
		gotKey=true;
	}
	//setting player to new proposed position (actually move)
	document.player.y=posn.y;
	document.player.x=posn.x; 
	//test if player escaped
	if(posn.y>450||posn.y<0||posn.x>450||posn.x<0) {
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
	}
	//setting players div to original position
	document.iDiv.style.marginTop=document.player.y-25;
	document.iDiv.style.marginLeft=document.player.x-25;
}
//when you rise press player stop
function stop()
{
	document.player.sx=0;
	document.player.sy=0;
};
//start the magic
window.onload = startGame;
//add controls
window.onkeypress=moveBox;
window.onkeyup=stop;
//set game interval that runs the magic
window.setInterval(update, 100);