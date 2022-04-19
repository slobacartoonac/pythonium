import { EntityManager } from 'my_lib/ecs.js'

import { PhysicsEngine, Physics} from 'my_lib/physics/physics.js'
import { ShapeCircle} from 'my_lib/shapes/circle.js'

import { Transform } from 'my_lib/physics/transform.js'
import { ChainEngine, ChainLink } from 'my_lib/physics/chainEngine.js'
import { ColisionEngine } from 'my_lib/physics/colisionEngine.js'
import { Renderer, RenderEngine } from 'my_lib/drawers/render.js'

import Select from 'my_lib/select.js'
import { Selectable, SelectableRenderEngine } from 'my_lib/drawers/select_ecs.js'

function Scene(draw){
	const manager = new EntityManager()
	const points = new RenderEngine(draw.context, manager)
	const selection = new Select()
	const selectedPoints = new SelectableRenderEngine(draw.context, manager, selection)
	const chainEngine = new ChainEngine(manager)
	const colisionEngine = new ColisionEngine(manager)
	const physics = new PhysicsEngine(manager, [chainEngine, colisionEngine])
	
	this.touchForce = function({
		delta, startPosition: selectStartPosition, position: selectPosition
	}, position) {
		var pointStart = draw.screenToWorld(position, Object.values(selectStartPosition))
		var pointEnd = draw.screenToWorld(position, Object.values(selectPosition))
		selection.setArea(pointStart, pointEnd)
	}
	
	 function markSelection (selection, objects){
		selection.forEach((elem, index) => {
			var { selectable } = objects.find(({transform})=> transform.positions == elem)
			selectable.isSelected = true
			selectable.index = index
		})
	}
	
	this.touchStop = function (
		{startPosition: selectStartPosition,
			position: selectPosition,
		}, position){
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
	
	this.touchClick = function ({x, y}, position){
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
	}
	
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
	
	this.work = function(position){
		points.draw( position )
		selectedPoints.draw( position )
		if(this.run)
			physics.compute();
	}
}

export { Scene }