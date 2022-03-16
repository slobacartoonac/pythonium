import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'

import { PhysicsEngine, Physics} from 'my_lib/physics/physics.js'
import { ShapeCircle} from 'my_lib/shapes/circle.js'

import { Transform } from 'my_lib/physics/transform.js'
import { ChainEngine, ChainLink } from 'my_lib/physics/chainEngine.js'
import { ColisionEngine } from 'my_lib/physics/colisionEngine.js'

import Ploter from 'my_lib/drawers/ploter.js'
import FPSPloter from 'my_lib/drawers/drawFPS.js'
import MassPloter from 'my_lib/drawers/drawMass.js'
import GridPloter from 'my_lib/drawers/drawGrid.js'
import { Renderer, RenderEngine } from 'my_lib/drawers/render.js'

import Select from 'my_lib/select.js'
import { Selectable, SelectableRenderEngine } from 'my_lib/drawers/select_ecs.js'

const canvas = document.getElementById('phy_canvas')
const selectionTool = document.getElementById('selection_tool')

var draw=new Ploter(canvas, 640,480)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})

const fps=new FPSPloter(draw.context)
const grid = new GridPloter(draw.context, 640, 480)

var manager = new EntityManager()
const points=new RenderEngine(draw.context, 640, 480, manager)
var selection = new Select()
const selectedPoints = new SelectableRenderEngine(draw.context, 640, 480, manager, selection)
const chainEngine = new ChainEngine(manager)
const colisionEngine = new ColisionEngine(manager)
const physics=new PhysicsEngine(manager, [chainEngine, colisionEngine])
const masa = new MassPloter(draw.context, 640, 480, manager)

var touch = new Touch(canvas, 100)
touch.sub('force', ({
	delta,
	startPosition: selectStartPosition,
	position: selectPosition,
})=>{
	if(!selectionTool.checked){
		position = {...position, x: position.x - delta.x / position.scale,
			y: position.y - delta.y / position.scale}
		return
	} else {
		var pointStart = draw.screenToWorld(position, Object.values(selectStartPosition))
		var pointEnd = draw.screenToWorld(position, Object.values(selectPosition))
		selection.setArea(pointStart, pointEnd)
	}
})

function markSelection(selection, objects){
	selection.forEach((elem, index) => {
		var { selectable } = objects.find(({transform})=> transform.positions == elem)
		selectable.isSelected = true
		selectable.index = index
	})
}

touch.sub('stop',(
	{startPosition: selectStartPosition,
		position: selectPosition,
		distance,
		click
	})=>{
	if(selectionTool.checked && !click){

		var pointStart = draw.screenToWorld(position, Object.values(selectStartPosition))
		var pointEnd = draw.screenToWorld(position, Object.values(selectPosition))
		const pointsSelectable = manager.getEnities(Selectable).map(
			(elem)=>{
				var transform = manager.get(Transform, elem)[0]
				var selectable = manager.get(Selectable, elem)[0]
				selectable.isSelected = false
				selectable.index = 0
				return {transform, selectable}
			}
		)
		const points = pointsSelectable.map(({transform})=> transform.positions)
		markSelection(selection.areaSelect(pointStart, pointEnd, points), pointsSelectable)
	}
})

touch.sub('click',({x, y})=>{
	var point = draw.screenToWorld(position, [x, y])
	const pointsSelectable = manager.getEnities(Selectable).map(
		(elem)=>{
			var transform = manager.get(Transform, elem)[0]
			var selectable = manager.get(Selectable, elem)[0]
			selectable.isSelected = false
			selectable.index = 0
			return {transform, selectable}
		}
	)
	const points = pointsSelectable.map(({transform})=> transform.positions)
	markSelection(selection.pointSelect(point, points, 10 / position.scale ), pointsSelectable)
})

var all=[]
var stabilex=0
var stabiley=200
var stabileDistance=12
var prevEntity = null
var entity = null
for(var i = 0 ; i < 500; i ++){
	entity = manager.create()
	manager.asign(new Transform([stabilex,stabiley]), entity)
	manager.asign(new Physics([0,0], 5, 0), entity)
	manager.asign(new ShapeCircle(5), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	manager.asign(new Selectable('#aaffbb'), entity)
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
manager.asign(new Physics([0,-5], 5, 0), entity)
manager.asign(new ShapeCircle(3), entity)
manager.asign(new Renderer('#aaffbb'), entity)
manager.asign(new Selectable('#aaffbb'), entity)
if(prevEntity){
	manager.asign(new ChainLink(entity,stabileDistance), prevEntity)
}
all.push(entity)

function work(){
	draw.clear()
	//masa.draw(position)
	grid.draw(100,100,position)
	points.draw( position )
	selectedPoints.draw( position )
	fps.draw()
	physics.compute()
	setTimeout(work,0)
}
work()