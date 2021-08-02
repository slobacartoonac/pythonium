import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'

import { PhysicsEngine, Physics} from 'my_lib/physics/physics.js'
import { ShapeCircle} from 'my_lib/shapes/circle.js'

import { Transform } from 'my_lib/physics/transform.js'
import { ChainEngine, ChainLink } from 'my_lib/physics/chainEngine.js'
import { ColisionEngine } from 'my_lib/physics/colisionEngine.js'

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
const chainEngine = new ChainEngine(manager)
const colisionEngine = new ColisionEngine(manager)
const physics=new PhysicsEngine(manager, [chainEngine, colisionEngine])
//const mass = new MassPloter(draw.context, 640, 480, manager)

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
var prevEntity = null
var entity = null
for(var i = 0 ; i < 396; i ++){
	entity = manager.create()
	manager.asign(new Transform([stabilex,stabiley]), entity)
	manager.asign(new Physics([0,0], 5), entity)
	manager.asign(new ShapeCircle(5), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	if(prevEntity){
		manager.asign(new ChainLink(prevEntity, stabileDistance), entity)
		manager.asign(new ChainLink(entity, stabileDistance), prevEntity)
	}
	prevEntity = entity
	all.push(entity)
	var prewa=Math.atan2(
		-0.3,
		50*Math.cos(i/10.0)
	)
	stabilex+= Math.cos(prewa)*stabileDistance
	stabiley+= Math.sin(prewa)*stabileDistance
}
entity = manager.create()
manager.asign(new Transform([stabilex,stabiley]), entity)
manager.asign(new Physics([0,-50],5), entity)
manager.asign(new ShapeCircle(3), entity)
manager.asign(new Renderer('#aaffbb'), entity)
if(prevEntity){
	manager.asign(new ChainLink(entity,stabileDistance), prevEntity)
}
manager.get(Physics, entity)[0].drag = 0
all.push(entity)
var frame = 0

function work(){
	frame++
	if(frame == 180){
		manager.get(Physics, entity)[0].speeds = [5, 0]
	}
	if(frame == 240){
		manager.get(Physics, entity)[0].speeds = [0, 20]
	}
	draw.clear()
	//mass.draw(position)
	grid.draw(100,100,position)
	points.draw( position )
	fps.draw()
	physics.compute()
	setTimeout(work,0)
}
work()