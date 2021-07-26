import Ploter from './ploter.js'
import Touch from './touch'
import drawFPS from './drawFPS'
import RNode from './ropeNode.js'

var draw=new Ploter(640,480)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})

var canvas = draw.getCanvas()
const fps=drawFPS(draw.context)
document.body.appendChild(canvas)
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})

var all=[]
var stabilex=0
var stabiley=200
var stabileDistance=10
for(var i =0 ; i < 196 ; i ++){
	all.push(new RNode([stabilex,stabiley],[0,0],5,all, i))
	var prewa=Math.atan2(
		-0.3,
		50*Math.cos(i/10.0)
		);
	stabilex+= Math.cos(prewa)*stabileDistance
	stabiley+= Math.sin(prewa)*stabileDistance
}

all.push(new RNode([stabilex+100,stabiley - 300],[ 0, 10],2,[], i))
all[all.length-1].drag=-0


function work(){
	//draw.clear()
	//draw.drawMass(all,position)
	draw.drawMass2([],position)
	//draw.grid(100,100,position)
	draw.points(
		all.map((elem)=> [elem.positions[0],elem.positions[1],elem.radius,elem.radius>7?'#ff9933':'#aaffbb'])
		,position
	)
	fps()
	all.forEach(function(e){
		e.compute()   
	})
	const allLength=all.length
	all.forEach(function(e){e.move()})

	setTimeout(work,30)
}
work()