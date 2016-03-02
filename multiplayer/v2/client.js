function Conect(){
	var ret={}
	ret.respond=null;
//creating socket connection with host on port 3000
var socket = io.connect(my_ip_var+':3000', {reconnect: true});
//register socket event on msg
socket.on('msg', function(msg){
   console.log(msg);
   ret.updateEnemyLabel(msg);
  });
socket.on('id', function(msg){
	game.id=msg.id;
  });
//register socket event on msg
socket.on('question', function(msg){
	//creating respond box
	if(ret.respond!=null)
	{
		ret.respond.parentNode.removeChild(ret.respond);
		ret.respond=null
	}
    ret.respond=createRespondBox(50,100,500,200,msg.q,
		function(e){
			//changing local player name
			msg.a=e;
			socket.emit(msg.e,msg);
			ret.respond=null;
	});
	ret.updateEnemyLabel(msg.q);
});
socket.on('comfrm',function(msg){
if(ret.respond!=null)
	{
		ret.respond.parentNode.removeChild(ret.respond);
		ret.respond=null
	}
	ret.respond=createReadyBox(50,100,500,200,msg.q,
		function(){
			socket.emit(msg.e,msg);
			ret.respond=null;
	});
	ret.updateEnemyLabel(msg.q);
});
socket.on('notify', function(msg){
	createTimeBox(50,400,500,80,msg.n,2);
	ret.updateEnemyLabel(msg.n);
});
socket.on('clear', function(msg){
if(ret.respond!=null)
	{
		ret.respond.parentNode.removeChild(ret.respond);
		ret.respond=null
	}

});
socket.on('choice', function(msg){
	if(ret.respond!=null)
	{
		ret.respond.parentNode.removeChild(ret.respond);
		ret.respond=null
	}
	ret.respond=createChoiceBox(50,100,500,200,msg.q,msg.c,function(e)
	{
		msg.a=e;
		socket.emit(msg.e,msg);
		ret.respond=null
	});
	ret.updateEnemyLabel(msg.c[0]);
});
socket.on('start', function(msg){
	game.players=msg.pls;
	game.players.forEach(function(pl)
	{
		if(pl.state!='ingame'&&pl.state!='ready') return;
		pl.div=createBox(pl.x+15,pl.y,30,50);
		if(pl.id!=game.id)
			pl.div.style.backgroundImage = 'url("planeother2.png")';
		else
		{	
			pl.div.style.backgroundImage = 'url("planeyou2.png")';
			
			pl.recharge= 10;
			pl.directionX=0;
			pl.directionY=0;
			pl.mouse=false;
			pl.toBe={x:pl.x, y: pl.y,};
			game.player=pl;
		}
	});
	clearLevel();
});
socket.on('end', function(msg){
	game.players.forEach(function(pl)
	{
		if(pl.div)
			removeObjct(pl);
	});
	game.players=[];
});
socket.on('dead', function(msg){
	game.players.forEach(function(pl)
	{
		if(pl.id==msg.id){
			pl.div.style.backgroundImage = 'none';
			createFire({x:pl.x,y:pl.y,xs:0,ys:5,r:25});
			}
		if(game.id==msg.id) game.player=null;
		
	});
});
socket.on('pos', function(msg){
	game.players.forEach(function(pl)
	{
		if(game.id==msg.id) return;
		if(pl.id==msg.id)
		{
			pl.x= msg.x;
			pl.y= msg.y;
		}
	});
});
socket.on('shoot', function(msg){

		if(game.id==msg.id) return;
		createShoot(msg.x,msg.y);

});
socket.on('rock', function(msg){
		createRock(msg);
});
socket.on('gun', function(msg){
		createGun(msg);
});
ret.send=function(obj)
{
	socket.emit(obj.e,obj);
}
ret.updateEnemyLabel=function(el) {
	if(game.player==null)
    	game.playerBoard.innerHTML += el+"</br>";
	else
		{
			var labels="Players:</br>";
			game.players.forEach(function(element) {
				labels+=' - '+ element.name+' '+element.state+'</br>';
			}, this);
			labels+="</br>B: "
			for(var i=0;i<game.player.recharge;i++)
				labels+="I "
			game.playerBoard.innerHTML = labels;
		}
};
return ret;
}
