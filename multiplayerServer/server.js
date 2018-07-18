var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db=require('./libs/bob_db');
var automat= require('./libs/client_state');
var pubsub= require('./libs/pubsub');
var fs=require('fs');
var log_file = fs.createWriteStream('./debug.log', {flags : 'a'});
var conections=[];
var groups=[];
var conected=0;
var boxes=0;
var allPlayers=db.create('./data/players.txt');
var allGroups=db.create('./data/groups.txt');
function Restore(){
	allPlayers.load();
	allGroups.load();
	var allg=allGroups.getAll();
	allg.forEach(function(element) {
		createGroup(element.name,element.maxs,element.pass);
	}, this);
}
Restore();

//groups state 0 - pree game , 1 - in game ,2 - post game
var gameState=0;

function createGroup(vname,maxScore,vpass)
{
	var group=pubsub.getPub();
		group.id=groups.length
		group.n=vname,
		group.s='loby';
		group.g={d:0,b:0,l:0,ol:0,i:null};
		group.ms=maxScore;
		group.ls=0;
		group.pass=vpass;
		group.start=function()
		{
			if(group.g.i!=null)
				clearInterval(group.g.i);
			group.g={d:0,b:0,l:0,ol:0,i:null};
			group.g.i = setInterval(function(){rocking(group.g,group)}, 30);
		};
		group.end=function()
		{
			group.ls=group.g.b;
			if(group.ms<group.ls){
				group.ms=group.ls;
				allGroups.update(group.n,{name:group.n,maxs:group.ms,pass:group.pass})
				}
			if(group.g.i!=null)
				clearInterval(group.g.i);
			group.g.i=null;
		};
		groups.push(group);
		if(!allGroups.taken(vname))
		{
			allGroups.add(vname,{name:vname,maxs:maxScore,pass:vpass});
		}
		return group;
}



function ConLog(mesage)
{
	var d=new Date();
	var mes='['+d.toLocaleString()+'] '+mesage;
	console.log(mes);
	log_file.write(mes);
}
//register on connection
io.on('connection', function(socket){
	//create player
	//while(allPlayers.taken(conected))conected+=1;
	var player=automat.client_state();
	player.name= 'Noname'+conected;
	player.id=conected;
	player.x=0;
	player.y=0;
	player.group=null;
	player.friend=[];
	//allPlayers.add(conected,{name:player.name,lvl:0,})
	player.publish=function(arg)
	{
		
		if(arg.o.all||arg.o.id==player.id)
			player.onEvent(arg.e);
		socket.emit(arg.e,arg.o);
	}
	//  conect:[{e:'registar',s:'menu',r:null}],
	//	menu:[{e:'create',s:'create',r:null},{e:'join',s:'autent',r:null}],
	//	autent:[{e:'aprove',s:'ingroup',r:null},{e:'exit',s:'menu',r:null}],
	//	create:[{e:'aprove',s:'ingroup',r:null},{e:'exit',s:'menu',r:null}],
	//	ingroup:[{e:'ready',s:'ready',r:null},{e:'watch',s:'watch',r:null},{e:'forcestart',s:'watch',r:null},{e:'exit',s:'menu',r:null}],
	//	ready:[{e:'start',s:'ingame',r:null},{e:'forcestart',s:'ingame',r:null},{e:'exit',s:'ingroup',r:null}],
	//	ingame:[{e:'die',s:'watch',r:null},{e:'end',s:'posgame',r:null}],
	//	watch:[{e:'end',s:'posgame',r:null}],
	//	posgame:[{e:'finish',s:'ingroup',r:null}]
	player.setFunctionDest('menu',function()
	{
		ConLog('Client '+player.id+' set name: '+ player.name+' '+player.state);
		socket.emit('id',{id:player.id});
		if(groups.length>0){
			var groupsname=[];
			groups.forEach(function(element) {
				groupsname.push(element.n+'- '+element.s+'('+element.getSubsNum()+')');
				element.rem(player.publish);
				player.group=null;
			}, this);
			socket.emit('choice',{q:'Want to join some of these groups?',c:groupsname,e:'Groups',a:''});
			}
		else socket.emit('comfrm',{q:'You are only one here.</br> You will have to make a group',e:'makeGroup'});	
	});
	player.setFunctionDest('ingroup',function()
	{
		if(player.group.getSubsNum()>1){
			
			socket.emit('choice',{q:'Group: '+player.group.n+'</br>State: '+player.group.s+'</br>Ready to start?',c:['ready','watch'],e:'ready',a:''});
			}
		else
			socket.emit('choice',{q:'Group: '+player.group.n+'</br>State: '+player.group.s+'</br>Start or wait other players to join.',c:['ready'],e:'ready',a:''});
	});
	player.setFunctionDest('autent',function()
	{
		var groupsname='';
			groups.forEach(function(element) {
				if(player.group.n==element.n){
						groupsname+=element.n;
						groupsname+=' : '+element.s;
						}
			}, this);
		socket.emit('choice',{q:'Do you want to join group '+groupsname,c:['yes'],e:'aproveGroup',a:''});
	});
	player.setFunctionDest('create',function()
	{
		socket.emit('question',{q:'Group Name?',e:'createGroup',a:player.name});
	});
	player.setFunctionDest('ready',function()
	{
		socket.emit('choice',{q:'Wait for other players to be ready...</br>Want to force start? </br> Players that are not ready will watch!',c:['FORCE START :/'],e:'forceStart',a:''});
	});
	player.setFunctionDest('ingame',function()
	{
		socket.emit('notify',{n:"GAME ON!!!!"});
		socket.emit('clear',{});
		//socket.emit('comfrm',{q:'Click when your dead',e:'dead'});	
	});
	player.setFunctionDest('posgame',function()
	{
		var topScore=0;
		groups.forEach(function(el)
		{
			if(topScore<el.ms)topScore=el.ms;
		});
		
		socket.emit('comfrm',{q:'Game score: '+player.group.ls+'</br>You\'r score: '+player.score+
		'</br>Group top score: '+player.group.ms+'</br>Server top score: '+ topScore,e:'end'});	
	});
	player.setFunctionDest('watch',function()
	{
		socket.emit('clear',{});
	});
	
	//create connection
	conection={p:player,s:socket};
	//update the number of connections
	conected++;
	//register event on socket rename
	function regEvent(event,func)
	{
		socket.on(event,func);
	}
	regEvent('registar', function(msg){
		player.name=msg.a;
		player.onEvent('registar');
	});
	regEvent('createGroup', function(msg){
		var isCreated=true;
		while(isCreated){
			isCreated=false;
		groups.forEach(function(element) {
				if(msg.a==element.n)
					isCreated=true;
			}, this);
			msg.a+='1';
			}
		msg.a = msg.a.substring(0, msg.a.length - 1)
		player.group=createGroup(msg.a,0,'');
		player.group.add(player.publish);
		player.onEvent('aprove');
	});
	regEvent('makeGroup', function(msg){
		player.onEvent('create');
	});
	regEvent('Groups', function(msg){
		//console.log(msg.a);
		if(msg.a=='no') player.onEvent('create');
		else{
			var grname=msg.a.split('-')[0];
			ConLog(grname+' <- '+player.name);
			groups.forEach(function(element) {
				if(grname==element.n)
					player.group=element;
			}, this);
			player.onEvent('join');
		}
	});
	regEvent('aproveGroup', function(msg){
		//console.log(msg.a);
		if(msg.a=='no') player.onEvent('exit');
		else{
			groups.forEach(function(element) {
				if(player.group==element)
					element.add(player.publish);
			}, this);
			player.onEvent('aprove');
		}
	});
	regEvent('ready', function(msg){
		if(msg.a=='no'){
				player.onEvent('exit');
		}
		else{
			player.group.s='ready';
			player.onEvent(msg.a);
			var start=true;
			var thisgame=conections.filter(function(el){return el.p.group==player.group;});
			var playgroup=[];
			var ip=0
			thisgame.forEach(function(el)
			{
				playgroup.push({id: el.p.id, x:100+(300/thisgame.length)*(ip++),y:350,name:el.p.name,state: el.p.state });
				if(el.p.state!='ready'&&el.p.state!='watch')
					start=false;
			});
			if(start)
			{	
				player.group.s='playing';
				player.group.pub({e:'start',o:{id:player.id,pls:playgroup,all:true}});
				player.group.start();
				ConLog(player.group.n+' start game');
			}
			
			}
	});
	regEvent('forceStart', function(msg)
	{
		if(msg.a=='no') player.onEvent('exit');
		
		else{
		var thisgame=conections.filter(function(el){return el.p.group==player.group;});
		var playgroup=[];
		var ip=0;
		player.group.pub({e:'forcestart',o:{id:player.id,all:true}});
		thisgame.forEach(function(el)
			{
				playgroup.push({id: el.p.id, x:100+(300/thisgame.length)*(ip++),y:350,name:el.p.name,state: el.p.state });
			});
		player.group.s='playing'
		player.group.pub({e:'start',o:{id:player.id,pls:playgroup,all:true}});
		player.group.start();
		ConLog(player.group.n+' force start game');
		}
	});
	//register event on socket pos
	regEvent('pos', function(msg){
		if(player.group!=null)
			player.group.pub({e:'pos',o:msg});
	});
	regEvent('shoot', function(msg){
		if(player.group!=null)
			player.group.pub({e:'shoot',o:msg});
	});
	regEvent('dead', function(msg){
		if(!player.group) return;
		player.score=player.group.g.b;
		player.group.pub({e:'dead',o:{id:player.id,all:false}});
		player.onEvent('die');
		var end=true;
		ConLog('player '+player.id+' died');
		conections.forEach(function(element) {
				if(player.group==element.p.group&&element.p.state=='ingame')
					end=false;
			}, this);
		if(end)
		{
			player.group.s='score';
			player.group.end();
			player.group.pub({e:'end',o:{id:player.id,all:true}});
			ConLog(player.group.n+' game over');
		}
	});
	regEvent('end', function(msg){
		if(!player.group) return;
		player.group.s='loby';
		player.onEvent('finish');
	})
	//register event on socket disconnect
	regEvent('disconnect', function() {
		
		//remove disconnected player
		conections=conections.filter(
			function(el)
			{
			return el.p.id!=player.id;
			}
		);
		if(player.group!=null){
		player.group.rem(player.publish);	
		player.group.pub({e:'notify',o:{n:"disconected: "+player.name}});
		}
		ConLog("disconected: "+player.name);
		ConLog("Server state \nPlayers: "+conections.length+"\nGroups: "+groups.length);
	});
	//call player to register
	socket.emit('question',{q:'What is your name?',e:'registar',a:player.name});
	//send connected players to new player

	//add new player to connections
	conections.push(conection);
	//call all players to create new player
	//io.emit('notify',{n:player.id});
	ConLog('Client '+player.id+' conected.');
});
var devider=0;
function rocking(boxes,group)
{
	
	boxes.d++;
	if(boxes.b<100&&boxes.d>8){
	boxes.b++
	boxes.l=0;
	if(boxes.l==boxes.ol)
		boxes.d=-1;
	else boxes.d=-300;
	boxes.ol=boxes.l;
	group.pub({e:'rock',o:{x: Math.floor(Math.random() * 600 ) ,y: 0,xs:0,ys:10,id: boxes.b,all:false }});
	}
	else if(boxes.b>99&&boxes.b<300&&boxes.d>6){
	boxes.b++
	boxes.l=1;
	if(boxes.l==boxes.ol)
		boxes.d=-1;
	else boxes.d=-300;
	boxes.ol=boxes.l;
	group.pub({e:'rock',o:{x: Math.floor(Math.random() * 600 ) ,y: 0 ,xs:Math.floor(Math.random() * 5 ) -2,ys:10,id: boxes.b ,all:false}});
	}
	else if(boxes.b>299&&boxes.b<600&&boxes.d>5) {boxes.b++ ;
	boxes.l=2;
	if(boxes.l==boxes.ol)
		boxes.d=-1;
	else boxes.d=-300;
	boxes.ol=boxes.l;
	group.pub({e:'rock',o:{x: Math.floor(Math.random() * 600 ) ,y: 0, xs:Math.floor(Math.random() * 11 ) -5,ys:Math.floor(Math.random() * 5 )+5,id: boxes.b,all:false }});}
	else if(boxes.b>599&&boxes.b<900&&boxes.d>2){boxes.b++ ;
	boxes.l=3;
	if(boxes.l==boxes.ol)
		boxes.d=-1;
	else boxes.d=-300;
	boxes.ol=boxes.l;
	group.pub({e:'rock',o:{x: Math.floor(Math.random() * 600 ) ,y: 0, xs:Math.floor(Math.random() * 3 ) -1,ys:Math.floor(Math.random() * 8 )+5,id: boxes.b,all:false }});}
	else if(boxes.b>899&&boxes.b<1200&&boxes.d>1){boxes.b++ ;
	boxes.l=4;
	if(boxes.l==boxes.ol)
		boxes.d=-1;
	else boxes.d=-300;
	boxes.ol=boxes.l;
	if(boxes.b%3==0)
		group.pub({e:'rock',o:{x: Math.floor(Math.random() * 600 ) ,y: 0, xs:Math.floor(Math.random() * 3 ) -1,ys:Math.floor(Math.random() * 15 )+8,id: boxes.b,all:false }});
	else group.pub({e:'gun',o:{x: Math.floor(Math.random() * 600 ) ,y: 0, xs:Math.floor(Math.random() * 3 ) -1,ys:Math.floor(Math.random() * 11 )+10,id: boxes.b,all:false }});
	}
	else if(boxes.b>1199&&boxes.d>0){boxes.b++ ;
	boxes.l=5;
	if(boxes.l==boxes.ol)
		boxes.d=-1;
	else boxes.d=-300;
	boxes.ol=boxes.l;
	if(boxes.b%3==0)
		group.pub({e:'rock',o:{x: Math.floor(Math.random() * 600 ) ,y: 0, xs:Math.floor(Math.random() * 7 ) -3,ys:Math.floor(Math.random() * 15 )+3,id: boxes.b,all:false }});
	else
		group.pub({e:'gun',o:{x: Math.floor(Math.random() * 600 ) ,y: 0, xs:Math.floor(Math.random() * 9 ) -4,ys:Math.floor(Math.random() * 11 )+10,id: boxes.b,all:false }});}
}


function exitHandler(options, err) {
	allGroups.save();
    process.exit();
}

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//var interval = setInterval(rocking, 30);
//start server on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
