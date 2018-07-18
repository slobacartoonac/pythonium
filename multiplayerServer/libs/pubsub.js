module.exports=
{
	getPub:function()
	{
		var ret={
		el:[],
		add:function(toadd)
		{
			this.el.push(toadd);
			console.log('subs num: '+this.el.length);
		},
		rem:function(torem)
		{
			this.el=this.el.filter(function(elem){return elem!=torem});
			console.log('subs num: '+this.el.length);
		},
		pub:function(arg)
		{
			this.el.forEach(function(element) {
				element(arg);
			}, this);
		},
		getSubsNum:function(){return this.el.length;}
		}
		
		return ret;
	}
}
