//this function creates div. returning its instance
//0:empty,1:brick,2:player,3:keyr,4:gater,
//kljucevi 3,5,7,
//vrata 4,6,8
jsonm=window.location.hash.toString();
jsonm=jsonm.split('#').join('').split('a').join('[').split('b').join(']').split('c').join(',');
map=[[0,1,0,1,0,0,0],
[0,0,1,0,1,0,1,0],
[0,0,1,1,1,0,1,0],
[0,0,1,0,1,0,1,0],
[0,0,1,1,1,0,1,0]]
if(jsonm.length>8)
	map=JSON.parse(jsonm);
function int(x)
{
	return Math.floor(x);
}
function createDiv(x,y,image)
{
	var iDiv = document.createElement('div');
			iDiv.id = 'block';
			iDiv.className = 'noselect';
			iDiv.style.backgroundImage = "url("+image+")";
			iDiv.style.height=20;
			iDiv.style.width=20; 
			iDiv.style.marginLeft=x;
			iDiv.style.marginTop=y;
			iDiv.style.position='absolute'
			iDiv.style.zIndex= y;
			container.appendChild(iDiv);
			return iDiv;

}
//bricks in level
bricks=[];
empty=[];

container=null;

size={x:0,y:0};
play=false;
function convert(vx,vy)
{
	if(vx<0) vx+=size.x;
	vx%=size.x;
	if(vy<0) vy+=size.y;
	vy%=size.y;
	return {x: vx,y:vy};
}

function isBrick(vx,vy)
{
	var r=convert(vx,vy);
	vx=r.x;
	vy=r.y;
	for(var i=0;i<bricks.length;i++)
	{
	if(bricks[i].x==vx&&bricks[i].y==vy)
		return true;
	}
	return false;
}

function toEmpty(vx,vy)
{
	var r=convert(vx,vy);
	vx=r.x;
	vy=r.y;
	for(var i=0;i<empty.length;i++)
	{
	if(empty[i].x==vx&&empty[i].y==vy){
		empty[i].n+=1;
		return false;
		}
	}
	empty.push({x:vx,y:vy,n:1});
	return true;
}



function delBrick(vx,vy)
{
	var numb=bricks.length;
	bricks=bricks.filter(function(el){
	if(el.x==vx&&el.y==vy)
		{
		el.div.parentNode.removeChild(el.div);
		return false;
		}
	else return true;
	});
	return numb!=bricks.length;
}

function startGame() {
			//adding background
			iDiv = document.createElement('div');
			iDiv.style.backgroundImage = "url('play.png')";
			iDiv.style.width=90;
			iDiv.style.height=50;
			iDiv.className='noselect';
			iDiv.style.position='absolute';
			iDiv.onclick=function(){play=(false==play)};
			container=document.getElementsByTagName('body')[0];
			container.appendChild(iDiv);
			container.onclick=clickControl;
			size={x:int(window.innerWidth/20-1),y:int(window.innerHeight/20-1)};

			bricks=[];
			var ix=20;
			var iy=20;
			var maxx=0;
			map.forEach(function(e)
			{
				e.forEach(function(ee)
				{
					if(ee==1)
					{
					bricks.push({x:int(ix/20),y:int(iy/20),c:0,div: createDiv(ix,iy,'./ork20.png')});
					}
					ix+=20;
				}
				)
				if(maxx<ix)maxx=ix;
				iy+=20;
				ix=20;
			}
			)
			
        }


function clickControl(e)
{
e.preventDefault();
ix=int(e.pageX/20-0.5);
iy=int(e.pageY/20-0.5);
if(isBrick(ix,iy))
	{
	delBrick(ix,iy);
	}
else
	{
	bricks.push({x:ix,y:iy,c:0,div: createDiv(ix*20,iy*20,'./ork20.png')});
	}
}


function updateInfo()
{

}
//function that runs game cycle
function update()
{
if(!play) return;
var toDel=[];

bricks.forEach(function(e)
			{
			var nabers=0;
				if(isBrick(e.x+1,e.y))nabers+=1;else toEmpty(e.x+1,e.y);
				if(isBrick(e.x-1,e.y))nabers+=1;else toEmpty(e.x-1,e.y);
				
				if(isBrick(e.x,e.y+1))nabers+=1;else toEmpty(e.x,e.y+1);
				if(isBrick(e.x,e.y-1))nabers+=1;else toEmpty(e.x,e.y-1);
				
				if(isBrick(e.x+1,e.y+1))nabers+=1;else toEmpty(e.x+1,e.y+1);
				if(isBrick(e.x+1,e.y-1))nabers+=1;else toEmpty(e.x+1,e.y-1);
				
				if(isBrick(e.x-1,e.y+1))nabers+=1;else toEmpty(e.x-1,e.y+1);
				if(isBrick(e.x-1,e.y-1))nabers+=1;else toEmpty(e.x-1,e.y-1);
			if(nabers<2||nabers>3) toDel.push({x:e.x,y:e.y});
			});
empty.forEach(function(e)
			{
			if(e.n==3) bricks.push({x:e.x,y:e.y,c:0,div: createDiv(e.x*20,e.y*20,'./ork20.png')});
			});
toDel.forEach( function(e)
{
	delBrick(e.x,e.y);
})

empty=[];


}

//start the magic
window.onload = startGame;
//add controls
//set game interval that runs the magic
window.setInterval(update, 200);