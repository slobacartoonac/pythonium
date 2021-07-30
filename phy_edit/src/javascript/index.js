import Ploter from './ploter.js'
import Touch from './touch.js'
import FPSPloter from './drawFPS.js'
import PointsPloter from './drawPoints.js'
import RNode from './ropeNode.js'
import MassPloter from './drawMass.js'
import GridPloter from './drawGrid.js'


const canvas = document.getElementById('phy_canvas')
var draw=new Ploter(canvas, 640,480)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})
const fps=new FPSPloter(draw.context)
const points=new PointsPloter(draw.context, 640, 480)
const mass = new MassPloter(draw.context, 640, 480)
const grid = new GridPloter(draw.context, 640, 480)
document.body.appendChild(canvas)
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})

var all=[]
var stabilex=0
var stabiley=200
var stabileDistance=12
for(var i =0 ; i < 100; i ++){
	all.push(new RNode([stabilex,stabiley],[0,0],5,all, i))
	var prewa=Math.atan2(
		-1,
		50*Math.cos(i/4.0)
	)
	stabilex+= Math.cos(prewa)*stabileDistance
	stabiley+= Math.sin(prewa)*stabileDistance
}

var pullNode = new RNode([stabilex,stabiley],[ -0.2, -2],2,[], i)
pullNode.drag=0
all.push(pullNode)




function work(){
	draw.clear()
	//mass.draw(all,position)
	grid.draw(100,100,position)
	if(pullNode.positions[1]<stabiley-300)
		pullNode.speeds[1]=0.9
	points.draw(
		all.map((elem)=> [elem.positions[0],elem.positions[1],elem.radius,elem.radius>7?'#ff9933':'#aaffbb'])
		,position
	)
	fps.draw()
	for(var z=0; z<20; z++){
		all.forEach(function(e){
			e.compute()   
		})
		all.forEach(function(e){e.move()})
	}


	setTimeout(work,30)
}
work()