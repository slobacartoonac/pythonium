import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'

import { PhysicsEngine, Physics} from 'my_lib/physics/physics.js'
import { ShapeCircle} from 'my_lib/shapes/circle.js'
import { PlasticColisionEngine } from 'my_lib/physics/plasticColisionEngine'
import { GravityEngine } from 'my_lib/physics/gravityEngine'

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
const gravityEngine = new GravityEngine(manager)
const colisionEngine = new PlasticColisionEngine(manager)
const physics=new PhysicsEngine(manager, [gravityEngine, colisionEngine])

document.body.appendChild(canvas)
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})

var all=[]

var tolook=0;
document.body.onclick=function(){tolook++;}

var entity = null
for(var i = 0 ; i < 1000; i ++){
	var angle=Math.random()*2*Math.PI;
	var radius = 50+Math.random()*600;
	var x=Math.sin(angle)*radius;
	var y=Math.cos(angle)*radius;
	var tan=Math.atan2(x, y)+Math.PI/2;
	var speedX= 2*Math.sin(tan)+Math.random()*4-2
	var speedY=	2*Math.cos(tan)+Math.random()*4-2
	var radius= 1+Math.random()*2

	entity = manager.create()
	manager.asign(new Transform([x, y]), entity)
	manager.asign(new Physics([speedX,speedY], radius), entity)
	manager.asign(new ShapeCircle(radius), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	all.push(entity)
}

function work(){
	draw.clear()
	//mass.draw(position)
	grid.draw(100,100,position)
	points.draw( position )
	fps.draw()
	physics.compute()
	all=all.filter(function(e){return manager.alive(e);})
	// if(tolook%2){
	// 	var toLookEntity=all[tolook%all.length]
	// 	var toLookTransform = manager.get(Transform, toLookEntity)[0]
	// 	position.x=toLookTransform.positions[0]
	// 	position.y=toLookTransform.positions[1]
	// }
	setTimeout(work,30)
}
work()