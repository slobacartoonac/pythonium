import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'

import { ShapeCircle} from 'my_lib/shapes/circle.js'

import { Transform } from 'my_lib/physics/transform.js'

import Ploter from 'my_lib/drawers/ploter.js'
import FPSPloter from 'my_lib/drawers/drawFPS.js'
import GridPloter from 'my_lib/drawers/drawGrid.js'
import { Renderer, RenderEngine } from 'my_lib/drawers/render.js'

const canvas = document.getElementById('phy_canvas')
var draw=new Ploter(canvas, 640,480)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})

const fps=new FPSPloter(draw.context)
const grid = new GridPloter(draw.context, 640, 480)

var manager = new EntityManager()
const points=new RenderEngine(draw.context, 640, 480, manager)

document.body.appendChild(canvas)
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})

var all=[]
var entity = null
for(var i = 0 ; i < 10; i ++){
	var angle=Math.random()*2*Math.PI;
	var radius = 30+Math.random()*200;
	var x= Math.sin(angle)*radius;
	var y= Math.cos(angle)*radius;
	var radius= 5
	entity = manager.create()
	manager.asign(new Transform([x, y]), entity)
	manager.asign(new ShapeCircle(radius), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	all.push(entity)
}

function work(){
	draw.clear()
	grid.draw(100,100,position)
	points.draw( position )
	fps.draw()
	setTimeout(work,0)
}
work()