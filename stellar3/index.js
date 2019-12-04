import { Gravity } from "gravity_calc";
import drawFPS from './drawFPS'
import SNode from './sunNode'
import Ploter from './ploter'
import Touch from './touch'




var position={x: 0, y:0, scale:1}
var positionArray = new Float32Array([position.x, position.y, position.scale])
window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
	positionArray = new Float32Array([position.x, position.y, position.scale])
})

var all=[]
all.push(new SNode([0,0],[0,0],65,all, "Sun"))
all.push(new SNode([255,0],[0,8],3,all, "Mercury"))
all.push(new SNode([300,0],[0,10],4,all, "Venus"))
all.push(new SNode([450,0],[0,10],7,all, "Earth"))
all.push(new SNode([600,0],[0,10],4,all, "Mars"))
all.push(new SNode([1400,0],[0,10],25,all, "Jupiter"))
all.push(new SNode([1440,0],[0,12],2,all, "Europa"))
all.push(new SNode([1450,0],[0,12],2,all, "Europa"))
all.push(new SNode([2800,0],[0,10],5,all, "Saturn"))
const generateItem= (size)=>{
	var angle=Math.random()*2*Math.PI
	var radius = 200 + Math.random()*2000
	var x=Math.sin(angle)*radius
	var y=Math.cos(angle)*radius
	var tan=Math.atan2(x, y)-Math.PI/2

	var el=new SNode(
		[x,y],
		[(10*Math.sin(tan)+Math.random()*14-7),
			(10*Math.cos(tan)+Math.random()*14-7)],
		size||(0.1+Math.random()),all)
	all.push(el)
}

setInterval(()=>{
	all.length<30 && generateItem()
}, 200)

// Construct the universe, and get its width and height.
const canvas = document.getElementById("stellar3");
const {width: widthC, height: heightC}= canvas.getBoundingClientRect();
const [width, height] = [widthC / 2,heightC / 2 ]
const gravity = Gravity.new(width,height);

// Give the canvas room for all of our cells and a 1px border
// around each of them.

var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
	positionArray = new Float32Array([position.x, position.y, position.scale])
})
var draw=new Ploter(canvas, width, height)

const ctx = draw.context;
const fps=drawFPS(ctx)
const img= ctx.createImageData(width, height)

var planetsArray = new Float32Array(all.length*3);

const drawGravity2 = () => {
	var planetsDataLength=all.length*3
	if(planetsArray.length !== planetsDataLength)
		planetsArray = new Float32Array(all.length*3);
	var bufferIndex=0;
	all.forEach((el)=> {
		planetsArray[bufferIndex]=el.positions[0]
		planetsArray[bufferIndex+1]=el.positions[1]
		planetsArray[bufferIndex+2]=el.mass
		bufferIndex+=3
	})
	gravity.draw_planets(
		img.data,
		img.data.length,
		planetsArray,
		planetsDataLength,
		positionArray
	);
  ctx.putImageData(img, 0, 0);
}
var i=0;

const renderLoop = () => {
  drawGravity2();
  draw.points(
	all.map((elem)=> [elem.positions[0],
	elem.positions[1],
	elem.radius,elem.radius>30
	?'#aa9933'
	:'#B45F04'])
	,position
	)
  fps();
  all.forEach(function(e){
		e.compute()   
	})
	const allLength=all.length
	for(i=0;i<allLength;i++)
	{
		const first=all.shift()
		if(!first.invalid) all.push(first)
	}
	all.forEach(function(e){
		e.move()
	})

  requestAnimationFrame(renderLoop);
};
requestAnimationFrame(renderLoop);