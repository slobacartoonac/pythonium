import Ploter from './ploter.js'
import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'
import FPSPloter from './drawFPS.js'
//import MassPloter from './drawMass.js'
import GridPloter from './drawGrid.js'

import { PhysicsEngine, Physics, ShapeCircle, Transform} from './physics.js'
import { Render, RenderEngine } from './render.js'
import { ChainEngine, ChainLink } from './chainEngine.js'
import { ColisionEngine } from './colisionEngine.js'

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
for(var i = 0 ; i < 2500; i ++){
	entity = manager.create()
	manager.asign(new Transform([stabilex,stabiley]), entity)
	manager.asign(new Physics([0,0], 5), entity)
	manager.asign(new ShapeCircle(5), entity)
	manager.asign(new Render('#aaffbb'), entity)
	if(prevEntity){
		manager.asign(new ChainLink(prevEntity, stabileDistance), entity)
		manager.asign(new ChainLink(entity, stabileDistance), prevEntity)
	}
	prevEntity = entity
	all.push(entity)
	var prewa=Math.atan2(
		-1,
		50*Math.cos(i/4.0)
	)
	stabilex+= Math.cos(prewa)*stabileDistance
	stabiley+= Math.sin(prewa)*stabileDistance
}

entity = manager.create()
manager.asign(new Transform([stabilex,stabiley]), entity)
manager.asign(new Physics([0,-5],5), entity)
manager.asign(new ShapeCircle(3), entity)
manager.asign(new Render('#aaffbb'), entity)
if(prevEntity){
	manager.asign(new ChainLink(entity,stabileDistance), prevEntity)
}
manager.get(Physics, entity)[0].drag = 0
all.push(entity)

function work(){
	draw.clear()
	//mass.draw(position)
	grid.draw(100,100,position)
	points.draw( position )
	fps.draw()
	physics.compute()
	setTimeout(work,0)
}
work()