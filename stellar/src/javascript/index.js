import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'

import { PhysicsEngine, Physics} from 'my_lib/physics/physics.js'
import { ShapeCircle} from 'my_lib/shapes/circle.js'
import { PlasticColisionEngine } from 'my_lib/physics/plasticColisionEngine'
import { GravityEngine } from 'my_lib/physics/gravityEngine'
import { GravityColorEngine } from './gravityColorEngine.js'

import { Transform } from 'my_lib/physics/transform.js'

import Ploter from 'my_lib/drawers/ploter.js'
import FPSPloter from 'my_lib/drawers/drawFPS.js'
import GridPloter from 'my_lib/drawers/drawGrid.js'
import { Renderer, RenderEngine } from 'my_lib/drawers/render.js'
import MassPloter from 'my_lib/drawers/drawMass.js'


const canvas = document.getElementById('phy_canvas')
const toolokInput = document.getElementById('tolook_value')
const drawMass = document.getElementById('draw_mass')
const drawGrid = document.getElementById('draw_grid')
const drawFPS = document.getElementById('draw_fps')
var draw=new Ploter(canvas, 640,480)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})

const fps=new FPSPloter(draw.context)
const grid = new GridPloter(draw.context, 640, 480)

var manager = new EntityManager()
const points=new RenderEngine(draw.context, 640, 480, manager)
const mass=new MassPloter(draw.context, 640, 480, manager)
const gravityEngine = new GravityEngine(manager)
const colisionEngine = new PlasticColisionEngine(manager)
const gravityColorEngine = new GravityColorEngine(manager)
const physics=new PhysicsEngine(manager, [gravityEngine, colisionEngine, gravityColorEngine])
var touch = new Touch(canvas, 100)
touch.sub('force', ({delta})=>{
	position = {...position, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale}
})

var all=[]

var entity = null
for(var i = 0 ; i < 250; i ++){
	var angle=Math.random()*2*Math.PI;
	var radius = 50+Math.random()*600;
	var x=Math.sin(angle)*radius;
	var y=Math.cos(angle)*radius;
	var tan=Math.atan2(x, y)+Math.PI/2;
	var speedX= 2*Math.sin(tan)+Math.random()*4-2
	var speedY=	2*Math.cos(tan)+Math.random()*4-2
	var radius= 1 + Math.random()*3

	entity = manager.create()
	manager.asign(new Transform([x, y]), entity)
	manager.asign(new Physics([speedX,speedY], 1+5*Math.abs(3-radius)), entity)
	manager.asign(new ShapeCircle(radius), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	all.push(entity)
}

function work(){
	var numb = parseInt(toolokInput.value)
	if(!isNaN(numb)){
		var toLookEntity=all[numb%all.length]
		var toLookTransform = manager.get(Transform, toLookEntity)[0]
		position.x=toLookTransform.positions[0]
		position.y=toLookTransform.positions[1]
	}
	draw.clear()
	if(drawMass.checked)
		mass.draw(position)
	if(drawGrid.checked)
		grid.draw(100,100,position)
	points.draw( position )
	if(drawFPS.checked)
		fps.draw()
	physics.compute()

	all=all.filter(function(e, index){
		var alive =  manager.alive(e);
		if(!alive && !isNaN(numb) && numb >= index){
			toolokInput.value = numb - 1;
		}
		return alive
	})
	if(numb >= all.length){
		toolokInput.value = all.length - 1
	}
	setTimeout(work,30)
}
work()