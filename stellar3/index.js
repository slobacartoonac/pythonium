import { Gravity } from "gravity_calc";
import drawFPS from './drawFPS'
import SNode from './sunNode'
import Ploter from './ploter'
import Touch from './touch'



var position={x: 400, y:300, scale:1}

var all=[]
all.push(new SNode([400,100],[100,0],14,all))
all.push(new SNode([467,120],[0,0],3,all))
all.push(new SNode([897,100],[100,0],15,all))
all.push(new SNode([340,232],[0,0],2,all))
all.push(new SNode([123,767],[100,0],14,all))
all.push(new SNode([890,543],[0,0],8,all))
all.push(new SNode([553,221],[100,0],12,all))
all.push(new SNode([412,345],[0,0],9,all))

// Construct the universe, and get its width and height.
const width = 800;
const height = 600;
const gravity = Gravity.new(width,height);

// Give the canvas room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("stellar3");
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})
var draw=new Ploter(canvas, 800, 600)

const ctx = draw.context;
const fps=drawFPS(ctx)
const img= ctx.createImageData(width, height)

const drawGravity2 = () => {
	var planetsArray = new Float32Array(all.length*3);
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
		planetsArray.length
	);
  ctx.putImageData(img, 0, 0);
}
var i=0;

const renderLoop = () => {
  drawGravity2();
  draw.points(
	all.map((elem)=> [elem.positions[0],elem.positions[1],elem.radius,elem.radius>7?'#ff9933':'#aaffbb'])
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