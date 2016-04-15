
function Button64(iargs,icallback,image,addto,idescText,idescDiv){
	this.args=iargs;
	this.calback=icallback;
	this.div=createImage(image);
	this.descText=idescText;
	this.descDiv=idescDiv;
	var link=this;
	this.div.onclick=function()
	{
		link.calback(link.args);
	}
	this.div.onmouseover=function()
	{
		link.descDiv.innerHTML=link.descText;
	}
	addto.appendChild(this.div);
}