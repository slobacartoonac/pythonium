import SNode from './sunNode.js'
import Ploter from './ploter.js'
import Touch from './touch'
import drawFPS from './drawFPS'

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
all.push(new SNode([0,0],[0,0],65,all, 'Sun'))
all.push(new SNode([255,0],[0,8],3,all, 'Mercury'))
all.push(new SNode([300,0],[0,10],4,all, 'Venus'))
all.push(new SNode([450,0],[0,10],7,all, 'Earth'))
all.push(new SNode([600,0],[0,10],4,all, 'Mars'))
all.push(new SNode([1400,0],[0,10],25,all, 'Jupiter'))
all.push(new SNode([1440,0],[0,12],2,all, 'Europa'))
all.push(new SNode([1450,0],[0,12],2,all, 'Europa'))
all.push(new SNode([2800,0],[0,10],5,all, 'Saturn'))
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
		


function work(){
	//draw.clear()
	//draw.drawMass(all,position)
	draw.drawMass2(all,position)
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
	for(var i=0;i<allLength;i++)
	{
		const first=all.shift()
		if(!first.invalid) all.push(first)
	}
	all.forEach(function(e){e.move()})

	setTimeout(work,30)
}
work()