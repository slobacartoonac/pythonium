import SNode from './sunNode.js'
import Ploter from './ploter.js'
import Touch from './touch'

var draw=new Ploter(800,600)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})

var canvas = draw.getCanvas()
document.body.appendChild(canvas)
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})


var all=[]
all.push(new SNode([0,0],[0,0],14,all))
all.push(new SNode([100,0],[0,1],3,all))
all.push(new SNode([300,0],[0,0.8],4,all))
all.push(new SNode([600,0],[0,0.8],6,all))
all.push(new SNode([-450,0],[0,-0.8],8,all))
all.push(new SNode([0,1000],[-0.7,0],5,all))
all.push(new SNode([0,1030],[-1,0],3,all))
const generateItem= (size)=>{
	var angle=Math.random()*2*Math.PI
	var radius = 200 + Math.random()*2000
	var x=Math.sin(angle)*radius
	var y=Math.cos(angle)*radius
	var tan=Math.atan2(x, y)+Math.PI/2

	var el=new SNode(
		[x,y],
		[(4*Math.sin(tan)+Math.random()*6-3)*0.1,
			(4*Math.cos(tan)+Math.random()*6-3)*0.1],
		size||(0.1+Math.random()),all)
	all.push(el)
}

setInterval(()=>{
	all.length<100 && generateItem()
}, 200)
	
for(var i=0;i<150;i++)
	generateItem()
		


function work(){
	//draw.clear()
	//draw.drawMass(all,position)
	draw.drawMass2(all,position)
	//draw.grid(100,100,position)
	draw.points(
		all.map((elem)=> [elem.positions[0],elem.positions[1],elem.radius,elem.radius>7?'#ff9933':'#aaffbb'])
		,position
	)
    
	all.forEach(function(e){
		e.compute()   
	})
	const allLength=all.length
	for(i=0;i<allLength;i++)
	{
		const first=all.shift()
		if(!first.invalid) all.push(first)
	}
	all.forEach(function(e){e.move()})

	setTimeout(work,30)
}
work()