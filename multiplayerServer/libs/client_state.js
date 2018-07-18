
//client_state.js
module.exports={
general_state:function ()
{
	var ret={};
	ret.state='start';
	ret.transitions=
	{
		start:[]
	}
	ret.onEvent=function(event)
	{
		var transition=ret.transitions[ret.state];
		for(var i=0; i<transition.length;i++)
			if(transition[i].e==event){
				//console.log(event+' : '+ret.state+' -> '+transition[i].s);
				ret.state=transition[i].s;
				if(transition[i].r!=null)
					transition[i].r();
				break;
				}
		
	};
	ret.setFunction=function(vstate,vevent,vfunc)
	{
		var transition=ret.transitions[vstate];
		for(var i=0; i<transition.length;i++)
			if(transition[i].e==vevent){
				//console.log('Set function');
				transition[i].r=vfunc
				break;
				}
	};
	ret.setFunctionDest=function(dstate,vfunc)
	{
	for (var transname in ret.transitions) 
    if (ret.transitions.hasOwnProperty(transname)) {
	   var transition=ret.transitions[transname];
			for(var i=0; i<transition.length;i++)
			if(transition[i].s==dstate){
				//console.log('Set function from '+transname+'-> '+dstate);
				transition[i].r=vfunc
				}
		
	}
	};
	return ret;
},
client_state:function()
{
	var ret=this.general_state();
	ret.state='conect';
	ret.transitions=
	{
		//e-event when trasite| s-state to transite to|r-function to call| 
		conect:[{e:'registar',s:'menu',r:null}],
		menu:[{e:'create',s:'create',r:null},{e:'join',s:'autent',r:null}],
		autent:[{e:'aprove',s:'ingroup',r:null},{e:'exit',s:'menu',r:null}],
		create:[{e:'aprove',s:'ingroup',r:null},{e:'exit',s:'menu',r:null}],
		ingroup:[{e:'ready',s:'ready',r:null},{e:'watch',s:'watch',r:null},{e:'forcestart',s:'watch',r:null},{e:'exit',s:'menu',r:null}],
		ready:[{e:'start',s:'ingame',r:null},{e:'forcestart',s:'ingame',r:null},{e:'exit',s:'ingroup',r:null}],
		ingame:[{e:'die',s:'watch',r:null},{e:'end',s:'posgame',r:null}],
		watch:[{e:'end',s:'posgame',r:null}],
		posgame:[{e:'finish',s:'ingroup',r:null},{e:'forcestart',s:'watch',r:null}]
	};
	return ret;
}
}