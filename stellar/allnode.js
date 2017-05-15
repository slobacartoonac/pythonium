(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SNode = require('./sunNode.js');

var Ploter=require('./ploter.js');

var draw=new Ploter(800,600);
document.body.appendChild(draw.getCanvas());
var all=[];
var tolook=0;
document.body.onclick=function(){tolook++;}
all.push(new SNode([0,0],[0,0],5,all));
for(var i=0;i<800;i++){
        var angle=Math.random()*2*Math.PI;
        var radius = 30+Math.random()*600;
        var x=Math.sin(angle)*radius;
        var y=Math.cos(angle)*radius;
        var tan=Math.atan2(x, y)+Math.PI/2;

        var el=new SNode([x,y],[2*Math.sin(tan)+Math.random()*4-2,/*Math.random()*10-5*/2*Math.cos(tan)+Math.random()*4-2],1+Math.random()/2,all);
        all.push(el);
}

var stable=false;
var position=[0,0];
function work(){
    draw.clear();
    draw.grid(position[0],position[1],100,100);
    draw.points(
        all.map(function(elem){return [elem.positions[0]-position[0],elem.positions[1]-position[1],elem.radius,elem.invalid?"#ffffff":"#008800"]})
    );
    
    all.forEach(function(e){
        //draw.line(e.positions[0]-position[0],e.positions[1]-position[1],e.speeds[0]*10,e.speeds[1]*10, "#ff0000");
        e.compute();   
    });
    all=all.filter(function(e){return !e.invalid;})
    
    position=[all[tolook%all.length].positions[0]-400,
                all[tolook%all.length].positions[1]-300];
    all.forEach(function(e){e.move()});
    console.log(all.length+"---------------------------------");
    if(!stable||true) setTimeout(work,10);
    else{
        all.forEach(function(el){
    })
    }
}
work();


    //example.js 





},{"./ploter.js":2,"./sunNode.js":3}],2:[function(require,module,exports){

function Ploter(width,height){

this.canvas = document.createElement("canvas");
this.canvas.width=width||320;
this.canvas.height=height||240;
this.context = this.canvas.getContext('2d')
 
 
}
Ploter.prototype.points=function(points)
{
    points.forEach(function(element) {
        this.context.beginPath();
        this.context.arc(element[0]>0?element[0]<this.canvas.width?element[0]:this.canvas.width:0, element[1]>0?element[1]<this.canvas.height?element[1]:this.canvas.height:0, element[2]>0?element[2]:0, 0, 2 * Math.PI, false);
        this.context.fillStyle = element[3];
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#333333';
        this.context.stroke();
    }, this);
}
Ploter.prototype.clear=function(points)
{
   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Ploter.prototype.grid=function(centerx,centery,sizex,sizey)
{
    var mx=((centerx/sizex)|0 )* sizex - centerx;
    var my=((centery/sizey)|0 )* sizey - centery;
    var startx=mx;
    var starty=my;
    for (var x = startx; x < this.canvas.width; x += sizex) {
        this.context.moveTo( x , 0);
        this.context.lineTo( x, this.canvas.height);
    }


    for (var y = starty; y <= this.canvas.height; y += sizey) {
        this.context.moveTo( 0, y );
        this.context.lineTo( this.canvas.width , y);
    }
    this.context.lineWidth = 2;
    this.context.strokeStyle = "gray";
    this.context.stroke();
    this.context.font = "10px Arial";
    this.context.fillText((centerx|0)+","+(centery|0),10,50);

}
Ploter.prototype.line=function(startx,starty,sizex,sizey,color)
{

    this.context.lineWidth = 1;
    this.context.moveTo( startx , starty);
    this.context.lineTo( startx + sizex, starty + sizey );
    

    this.context.strokeStyle = color;
    this.context.stroke();
}
Ploter.prototype.getCanvas=function()
{
    return this.canvas;
}




module.exports=Ploter;
},{}],3:[function(require,module,exports){

function SNode(positions,speeds,radius,inputs)
{
    this.radius=radius;
    this.positions=positions?positions:[];
    this.speeds=speeds?speeds:[];
    this.inputs=inputs?inputs:[];
    this.invalid=null;
}
SNode.prototype.compute=function()
{
    if(this.invalid)return;
    //this.output=0;
    //ascArry = Array.apply(null, Array(this.positions.length)).map(Number.prototype.valueOf,0); 
    this.inputs.forEach(function(element) {
        if(this==element || element.invalid) return;
        var testDist = this.distance( element );
        if(testDist<this.radius+element.radius)
        {
            element.invalid=true;
            this.merge(element);
            return;
        }
        var asc = Math.pow(element.radius,2)*Math.PI / Math.pow(testDist,2);
        for (var i=0;i<this.positions.length;i++)
        {
            this.speeds[i]+=asc*(element.positions[i]-this.positions[i])/testDist;
        }
    }, this);
   // for(var j=0;j<this.speeds.length;j++)
    //    =ascArry[j];

        
}
SNode.prototype.merge=function(testNode)
{
    var massA=Math.pow(this.radius,2)*Math.PI;
    var massB=Math.pow(testNode.radius,2)*Math.PI;
    var newRadious= Math.sqrt( (massA+massB)/Math.PI );

    for (var i=0;i< this.speeds.length;i++)
    {
        this.speeds[i]=(this.speeds[i]*massA+testNode.speeds[i]*massB)/(massA+massB)
    }
    this.radius=newRadious;
}
SNode.prototype.distance=function(testNode)
{
    var length=testNode;
    var square=0;
    for(var i=0;i<testNode.positions.length;i++)
            square+=Math.pow(testNode.positions[i]-this.positions[i],2);
    return Math.sqrt(square);
}
SNode.prototype.move=function(testNode,toword)
{
        for(var k=0;k<this.positions.length;k++){
        this.positions[k]+=this.speeds[k];
       // this.positions[k]%=500;
        //this.positions[k]=this.positions[k]<0?this.positions[k]+500:this.positions[k];
    }
}


module.exports=SNode;

},{}]},{},[1]);
