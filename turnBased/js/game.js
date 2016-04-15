//this function creates div. returning its instance
//0:empty,1:brick,2:player,3:keyr,4:gater,
//kljucevi 3,5,7,
//vrata 4,6,8
//jsonm=window.location.hash.toString();
//jsonm=jsonm.split('#').join('').split('a').join('[').split('b').join(']').split('c').join(',');

//map=JSON.parse(jsonm);
var map=
[[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,0,0,1,1,1,0,0,1,1],
[1,1,1,1,1,0,0,1,1,1,0,0,1,1],
[1,1,0,0,1,1,0,1,1,1,0,1,1,1],
[1,1,0,0,1,1,0,1,1,1,0,1,1,1],
[1,1,1,0,0,0,0,0,0,0,0,0,1,1],
[1,0,0,0,0,4,3,3,4,0,0,0,1,1],
[1,1,1,1,0,2,3,1,2,0,1,1,1,1],
[1,1,1,1,0,2,4,2,2,0,1,1,1,1],
[1,1,1,1,1,1,0,1,0,0,0,1,1,1],
[1,1,1,1,1,0,0,1,1,0,0,0,1,1],
[1,1,1,1,1,0,0,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

var game={world:null,infoS:null,pl:0,players:[],vehicle:[],selectFunc:defaultSelectFunc};
var mapString=["ground","hill","road","water","city"];
var mapCost=[2,4,1,100,2];
var playerString=["first","second","third"];
var playerChar=["r","b","g"];
var typeString=["thank","pvo","plane","base"];
var typeChar=["t","p","a"];
var typeMove=[4,5,8,0];
var typeDamage=[[50,20,60,20],[80,50,20,20],[30,80,50,20],[50,10,50,0]];
var typeCost=[55,100,150,0];
var fightLog=[];

function getImageLink(pl,type,armed)
{
	var pt=playerChar[pl]+typeChar[type];
	if(armed)
		return "./vehicles64/"+pt+"a.png";
	else
		return "./vehicles64/"+pt+"n.png";
}


function getVehicle(ix,iy)
{
	var max=game.vehicle.length;
	for(var i=0;i<max;i++)
	{
		var veh=game.vehicle[i]
		if(veh.x==ix&&veh.y==iy)
			return veh;
	}
	return null;
}
function getVehicleDesc(type)
{
	var ret="Type: "+typeString[type]+"<br>cost: "+typeCost[type]+"<br>move points: "+typeMove[type]+"<br>";
	ret+="<select style=\"font-size:20px;background-color: #888888;\" ><option value=\"Against\">type  atck:rcv_dmg</option>"
	for(var i=0;i<4;i++){
		var sizer=typeString[i];
		while(sizer.length<8)sizer+=" ";
		ret+="<option value=\""+sizer+"\">"+sizer+typeDamage[i][type]+":"+typeDamage[type][i]+"</option>";
		}
	ret+="</select>"
	return ret;
}
function upradeFights(agresor,damaged,damage,fatal)
{
	var lastFight=playerString[agresor.player]+":"+typeString[agresor.type]+" --> "+playerString[damaged.player]+":"+typeString[damaged.type]+" (-"+int(damage)+")";
	if(fatal)lastFight+=" fatal";
	fightLog.push(lastFight);
	while(fightLog.length>6) fightLog.shift();;
	var tFights="";
	fightLog.forEach(function(element) {
		tFights=element+"<br>"+tFights;
	}, this);
	game.fightS.innerHTML=tFights;
}
function getVehicleStatus(veh)
{
	return playerString[veh.player]+" "+typeString[veh.type]+" armed: "+veh.armed+"<br>power: "+int(veh.pow)+"<br>can move: "+veh.move;
}
function fightVehicle(ix,iy,fight)
{
	var toBeet=getVehicle(ix,iy);
	if(!toBeet) return false;
	if(toBeet.player==fight.player) return true;
	//{x:x,y:y,player:pl,type:itype,div:createBrick(x*64,y*64,"./vehicles64/"+pt+"a.png"),move:0,armed:false,pow:100}
	var damage=0;
	if(toBeet.armed)
	{
		damage=Math.random()*typeDamage[fight.type][toBeet.type];
		fight.pow-=damage;
		if(toBeet.type!=3){
			toBeet.armed=false;
			toBeet.div.style.backgroundImage="url("+getImageLink(toBeet.player,toBeet.type,toBeet.armed)+")";
			}
		upradeFights(toBeet,fight,damage,fight.pow<0);
		if(fight.pow<0){
			game.players[toBeet.player].base.pow+=20;
			game.vehicle=game.vehicle.filter(function(el){
				if(el.x==fight.x&&el.y==fight.y)
				{
					removeObject(fight);
					return false;
				}
				return true;
			});
			}
	}
	if(fight.armed)
	{
		damage=Math.random()*typeDamage[toBeet.type][fight.type];
		toBeet.pow-=damage
		fight.armed=false;
		if(fight.div)
			fight.div.style.backgroundImage="url("+getImageLink(fight.player,fight.type,fight.armed)+")";
		upradeFights(fight,toBeet,damage,toBeet.pow<0)
		if(toBeet.pow<0){
			game.players[fight.player].base.pow+=20;
			game.vehicle=game.vehicle.filter(function(el){
				if(el.x==toBeet.x&&el.y==toBeet.y)
				{
					removeObject(toBeet);
					return false;
				}
				return true;
			});
			if(toBeet.type==3)
			 {
				 game.players[fight.player].score+=1;
				 game.players[fight.player].base.pow+=500;
				 game.players[toBeet.player].base=null;
				 game.world.appendChild(createTimeBox(150,300,400,100,"Player "+playerString[toBeet.player]+" has been defeated!!",5));
				 setTimeout(function(){window.location="./index.html";},6000);
			 }
			}
	}
	updatePlayerLabel();
	return true;
}

function refreshVehicles()
{
	var max=game.vehicle.length;
	for(var i=0;i<max;i++)
	{
		var veh=game.vehicle[i]
		veh.move=typeMove[veh.type];
		veh.armed=true;
		if(veh.type!=3)
			veh.div.style.backgroundImage="url("+getImageLink(veh.player,veh.type,veh.armed)+")";
	}
}
function getNet(pl)
{
	var net=0;
	var max=game.vehicle.length;
	for(var i=0;i<max;i++)
	{
		var veh=game.vehicle[i]
		if(veh.player==pl)
			net+=veh.pow;
	}
	return int(net);
}


function createBrick(x , y,image)
{
		var iDiv = document.createElement('div');
			iDiv.id = 'block';
			iDiv.className = 'walls';
			iDiv.style.backgroundImage = "url("+image+")";
			iDiv.style.height=64;
			iDiv.style.width=64; 
			iDiv.style.marginLeft=x;
			iDiv.style.marginTop=y;
			iDiv.style.position='absolute'
			//iDiv.style.zIndex= y;
			game.world.appendChild(iDiv);
			return iDiv;
}
function createImage(image)
{
		var iDiv = document.createElement('div');
			iDiv.style.backgroundImage = "url("+image+")";
			iDiv.style.height=64;
			iDiv.style.width=64;
			iDiv.style.float="left"; 
			iDiv.style.margin="5px";
			iDiv.style.backgroundColor ="gray";
			return iDiv;
}
function updatePlayerLabel()
{
	game.playersS.innerHTML="";
	var i=0;
	game.players.forEach(function(el)
	{
		if(i==game.pl)
			game.playersS.innerHTML+="=> "
		game.playersS.innerHTML+=i+". "+playerString[i].toUpperCase();
		if(el.base) game.playersS.innerHTML+= " "+int(el.base.pow);
		else game.playersS.innerHTML+= " -"
		game.playersS.innerHTML+= ":"+getNet(i);
		if(i==game.pl) game.playersS.innerHTML+=" <=";
		i++;
		game.playersS.innerHTML+="<br>";
	})
}
function startGame() {
			
			game.world=document.getElementById('map');
			game.world.onclick=clickControl;
			game.infoS=document.getElementById('selected');
			game.operationS=document.getElementById('operation');
			game.fightS=document.getElementById('fightLog');
			game.playersS=document.getElementById('players');
			game.descS=document.getElementById('desc');
			game.pl=0;
			game.players.push({base:null,vehicles:0,score:0});
			game.players.push({base:null,vehicles:0,score:0});
			bricks=[];
			var ix=0;
			var iy=0;
			var maxx=0;
			map.forEach(function(e)
			{
				e.forEach(function(ee)
				{
					if(ee==0)
					{
						createBrick(ix,iy,'./ground64/ground.png');
					}
					if(ee==1)
					{
						createBrick(ix,iy,'./ground64/hill.png');
					}
					if(ee==2)
					{
						createBrick(ix,iy,'./ground64/road.png');
					}
					if(ee==3)
					{
						createBrick(ix,iy,'./ground64/water.png');
					}
					if(ee==4)
					{
						createBrick(ix,iy,'./ground64/city.png');
					}
					ix+=64;
				}
				)
				if(maxx<ix)maxx=ix;
				iy+=64;
				ix=0;
			}
			)
		updatePlayerLabel();
			
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
	selectControl({x:Math.round(e.pageX/64-0.5),y:Math.round(e.pageY/64-0.5)});
}
function selectControl(epos)
{
	if(game.select)
		removeObject(game.select);
	game.select={pos:epos,div:createBrick(epos.x*64,epos.y*64,'./graphics64/select.png')};
	game.infoS.innerHTML= "Playing: "+playerString[game.pl].toUpperCase()+"<br>("+epos.x+","+epos.y+"): "+mapString[map[epos.y][epos.x]]+"</br>";
	game.selectFunc(epos);
	}
function defaultSelectFunc(epos){
	game.operationS.innerHTML="";
	game.actions=[];
	var sVehicle=getVehicle(epos.x,epos.y);
	if(sVehicle){
			game.infoS.innerHTML+=getVehicleStatus(sVehicle);
			if(game.pl==sVehicle.player&&sVehicle.move>0)
			{
				game.actions.push(new Button64([epos.x,epos.y,sVehicle],moveStart,"./graphics64/move.png",game.operationS,"Move "+typeString[sVehicle.type],game.descS))
			}
		}
	else{
		game.operationS.innerHTML="Create:<br>";
		if(game.players[game.pl].base&&Math.abs(game.players[game.pl].base.x-epos.x)<3&&Math.abs(game.players[game.pl].base.y-epos.y)<3)
			for(var i=0;i<3;i++){
				var pt=playerChar[game.pl]+typeChar[i];
				if(mapCost[map[epos.y][epos.x]]<4)
					game.actions.push(new Button64([epos.x,epos.y,game.pl,i],createUnit,"./vehicles64/"+pt+"a.png",game.operationS,getVehicleDesc(i),game.descS))
			};
		if(!game.players[game.pl].base){
			if(mapCost[map[epos.y][epos.x]]<4)
				game.actions.push(new Button64([epos.x,epos.y,game.pl],
			function(args)
			{
				var x=args[0],y=args[1],pl=args[2];
				var be={x:x,y:y,player:pl,type:3,div:createBrick(x*64,y*64,"./structures64/"+playerChar[args[2]]+"b.png"),move:0,armed:false,pow:1000};
				game.players[game.pl].base=be;
				game.vehicle.push(be)
				updatePlayerLabel();
				selectControl({x:args[0],y:args[1]});		
			}
			,"./structures64/"+playerChar[game.pl]+"b.png",game.operationS,getVehicleDesc(3),game.descS))
			
		}
		}
		game.actions.push(new Button64([epos.x,epos.y],nextPlayer,"./graphics64/next.png",game.operationS,"End turn",game.descS))
//if(direction) {direction=null;stop(); return;}
//direction={x:Math.round((Math.round((e.pageX)/50-0.5)*50-player.x)/10)*10,y:Math.round((Math.round((e.pageY)/50-0.5)*50-player.y)/10)*10};
}

function moveSelectFunc(epos)
{
	game.operationS.innerHTML="";
	var sVehicle=getVehicle(epos.x,epos.y);
	if(sVehicle)
			game.infoS.innerHTML+=getVehicleStatus(sVehicle);
	game.actions.push(new Button64([epos.x,epos.y],
	function(args){
		moveStop(args,true);
	},"./graphics64/cancelMove.png",game.operationS,"Stop moving "+typeString[game.moving.type],game.descS))
	game.actions.push(new Button64([epos.x,epos.y],nextPlayer,"./graphics64/next.png",game.operationS,"End turn",game.descS))
	moveUnit([epos.x,epos.y]);
};



function nextPlayer(args)
{
	game.pl+=1;
	game.pl%=game.players.length;
	moveStop(args,false);
	refreshVehicles();
	selectControl({x:args[0],y:args[1]});
	updatePlayerLabel();
	
}

function createUnit(args)
{
	var x=args[0],y=args[1],pl=args[2],itype=args[3];
	
	if(game.players[pl].base.pow-typeCost[itype]<=0) return;
	game.players[pl].base.pow-=typeCost[itype];
	var veh={x:x,y:y,player:pl,type:itype,div:createBrick(x*64,y*64,getImageLink(pl,itype,false)),move:0,armed:false,pow:100};
	game.vehicle.push(veh)	
	selectControl({x:args[0],y:args[1]});
	updatePlayerLabel();
}
function moveStart(args)
{
	game.moving=args[2];
	game.selectFunc=moveSelectFunc;
	selectControl({x:args[0],y:args[1]});
}
function moveStop(args,refresh)
{
	game.moving=null;
	game.selectFunc=defaultSelectFunc;
	if(game.moveIcon)
			removeObject(game.moveIcon);
	if(refresh)
		selectControl({x:args[0],y:args[1]});
}
//function for moveing player
function moveUnit(args)
{
	var ix=args[0],iy=args[1];
	if(game.moving)
	{
		var skip=false;
		var toBe=0;
		var fight=false;
		var tFight=false;
		while(ix!=game.moving.x&&game.moving.move>0&&!skip)
		{
			if(ix<game.moving.x)
			{
				toBe=map[game.moving.y][game.moving.x-1];
				tFight=fightVehicle(game.moving.x-1,game.moving.y,game.moving);
				if(tFight) fight=tFight;
				if(game.moving.move-mapCost[toBe]>=0&&!tFight){
					game.moving.x-=1;
					game.moving.move-=mapCost[toBe];
				} else skip=true;
			}
			else
			{
				toBe=map[game.moving.y][game.moving.x+1];
				tFight=fightVehicle(game.moving.x+1,game.moving.y,game.moving);
				if(tFight) fight=tFight;
				if(game.moving.move-mapCost[toBe]>=0&&!tFight){
				game.moving.x+=1;
				game.moving.move-=mapCost[toBe];
				}else skip=true;
			}
			if(!skip)
				game.moving.div.style.marginLeft=game.moving.x*64;
		}
		skip=false;
		while(iy!=game.moving.y&&game.moving.move>0&&!skip)
		{
			if(iy<game.moving.y)
			{
				toBe=map[game.moving.y-1][game.moving.x];
				tFight=fightVehicle(game.moving.x,game.moving.y-1,game.moving);
				if(tFight) fight=tFight;
				if(game.moving.move-mapCost[toBe]>=0&&!tFight){
				game.moving.y-=1
				game.moving.move-=mapCost[toBe];
				}else skip=true;
			}
			else
			{
				toBe=map[game.moving.y+1][game.moving.x];
				tFight=fightVehicle(game.moving.x,game.moving.y+1,game.moving);
				if(tFight) fight=tFight;
				if(game.moving.move-mapCost[toBe]>=0&&!tFight){
				game.moving.y+=1
				game.moving.move-=mapCost[toBe];
				}else skip=true;
			}
			if(!skip)
				game.moving.div.style.marginTop=game.moving.y*64;
		}
		if(game.moveIcon)
			removeObject(game.moveIcon);
		game.moveIcon={div:createBrick(game.moving.x*64,game.moving.y*64,'./graphics64/move.png')};
		if(game.moving.move<=0||game.moving.div==null||nextCost(game.moving.x,game.moving.y)>game.moving.move||fight){
			moveStop(args,true);
			}
	}
}
function nextCost(ix,iy)
{
	var min=mapCost[map[iy+1][ix]];
	var pot=mapCost[map[iy-1][ix]];
	if(pot<min)min=pot;
	pot=mapCost[map[iy][ix+1]];
	if(pot<min)min=pot;
	pot=mapCost[map[iy][ix-1]];
	if(pot<min)min=pot;
	return min;
}

function updateInfo()
{

//infobar[0].innerHTML='</br>'+player.kr;
//infobar[1].innerHTML='</br>'+player.kb;
//infobar[2].innerHTML='</br>'+player.kg;
}

function testPath(posn)
{
}
//function that runs game cycle
function update()
{

bricks.forEach(function(e)
			{
				//if(colide(posn,e))
				//{
				//if position is not free then new proposition is not to move
				//		posn.y=player.y;
				//		posn.x=player.x; 
				//}
			});

}
//when you rise press player stop
function stop()
{

};
function moveBox()
{

}
//start the magic
window.onload = startGame;
//add controls
window.onkeypress=moveBox;
window.onkeyup=stop;
//set game interval that runs the magic
window.setInterval(update, 100);