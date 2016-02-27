function removeObjct(o)
{
if(o.div!=null)
	o.div.parentNode.removeChild(o.div);
o.div=null;
}
function createBox(x,y,sx,sy)
{
	var newBox=document.createElement('div');
	newBox.style.marginTop=y;
	newBox.style.marginLeft=x;
	newBox.style.width=sx;
	newBox.style.minHeight=sy;
	newBox.style.position='absolute';
	newBox.className = 'noselect';
	game.body.appendChild(newBox);
	return newBox;
}
function createRespondBox(x,y,sx,sy,question, func)
{
	var newBox=createBox(x,y,sx,sy)
	newBox.style.backgroundColor='white';
	newBox.style.zIndex=1000;
	newBox.appendChild(document.createElement("br"));
	var respontTo = document.createElement('div');
	respontTo.innerHTML=question;
	respontTo.style.width='60%';
	respontTo.style.margin='auto';
	newBox.appendChild(respontTo);
	
	newBox.appendChild(document.createElement("br"));
	
	var txarea = document.createElement("TEXTAREA");
	
	txarea.style.width='100%';
	var textareadiv= document.createElement('div');
	textareadiv.appendChild(txarea);
	textareadiv.style.width='60%';
	textareadiv.style.margin='auto';
	
	
	newBox.appendChild(textareadiv);
	newBox.appendChild(document.createElement("br"));
	var button=document.createElement('div');
	button.style.border = "medium solid #000000";
	button.className='press';
	button.innerHTML='Send';
	button.style.width='60%';
	button.style.margin='auto';
	button.onclick=function(){
				if(txarea.value=="") return;
				func(txarea.value);
				newBox.parentNode.removeChild(newBox);
				};
	newBox.appendChild(button);
	return newBox;
}
function createReadyBox(x,y,sx,sy,question, func)
{
	var newBox=createBox(x,y,sx,sy)
	newBox.style.backgroundColor='white';
	newBox.style.zIndex=1000;
	newBox.appendChild(document.createElement("br"));
	var respontTo = document.createElement('div');
	respontTo.innerHTML=question;
	respontTo.style.width='60%';
	respontTo.style.margin='auto';
	newBox.appendChild(respontTo);
	
	newBox.appendChild(document.createElement("br"));
	
	newBox.appendChild(document.createElement("br"));
	var button=document.createElement('div');
	button.style.border = "medium solid #000000";
	button.className='press';
	button.innerHTML='Ready';
	button.style.width='60%';
	button.style.margin='auto';
	button.onclick=function(){
				func();
				newBox.parentNode.removeChild(newBox);
				};
	newBox.appendChild(button);
	return newBox;
}
function createChoiceBox(x,y,sx,sy,question,choices, func)
{
	var newBox=createBox(x,y,sx,sy)
	newBox.style.backgroundColor='white';
	newBox.style.zIndex=1000;
	newBox.appendChild(document.createElement("br"));
	var respontTo = document.createElement('div');
	respontTo.innerHTML=question;
	respontTo.style.width='60%';
	respontTo.style.margin='auto';
	newBox.appendChild(respontTo);
	
	newBox.appendChild(document.createElement("br"));
	
	for(var i=0;i<choices.length;i++){
		newBox.appendChild(document.createElement("br"));
		var button=document.createElement('div');
			button.style.border = "medium solid #000000";
			button.className='press';
			button.innerHTML=choices[i];
			button.style.width='60%';
			button.style.margin='auto';
			button.onclick=function(){
					func(this.innerHTML);
					newBox.parentNode.removeChild(newBox);
					};
			newBox.appendChild(button);
	}
	newBox.appendChild(document.createElement("br"));
		var button1=document.createElement('div');
		button1.style.border = "medium solid #000000";
		button1.className='press';
		button1.innerHTML='no';
		button1.style.width='60%';
		button1.style.margin='auto';
		button1.onclick=function(){
					func(this.innerHTML);
					newBox.parentNode.removeChild(newBox);
					};
		newBox.appendChild(button1);
	newBox.appendChild(document.createElement("br"));
	
	return newBox;
}
function createTimeBox(x,y,sx,sy,question,time)
{
	var newBox=createBox(x,y,sx,sy)
	newBox.style.backgroundColor='white';
	newBox.style.zIndex=1000;
	newBox.appendChild(document.createElement("br"));
	var respontTo = document.createElement('div');
	respontTo.innerHTML=question;
	respontTo.style.width='60%';
	respontTo.style.margin='auto';
	newBox.appendChild(respontTo);
	setTimeout(function(){newBox.parentNode.removeChild(newBox);},time*1000);
	
	return newBox;
}