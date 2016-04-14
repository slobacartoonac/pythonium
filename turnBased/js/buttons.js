
function Button64(iargs,icallback,image,addto){
	this.args=iargs;
	this.calback=icallback;
	this.div=createImage(image);
	var link=this;
	this.div.onclick=function()
	{
		link.calback(link.args);
	}
	addto.appendChild(this.div);
}