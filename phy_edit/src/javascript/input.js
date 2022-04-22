import { EntityManager } from 'my_lib/ecs.js'

import { PhysicsEngine, Physics} from 'my_lib/physics/physics.js'

import { Transform } from 'my_lib/physics/transform.js'
import { ChainEngine, ChainLink } from 'my_lib/physics/chainEngine.js'
import { ColisionEngine } from 'my_lib/physics/colisionEngine.js'
import { Renderer, RenderEngine } from 'my_lib/drawers/render.js'

import Select from 'my_lib/select.js'
import { Selectable } from 'my_lib/drawers/select_ecs.js'
import { ShapeBox } from '../../../lib/shapes/box'
import { ShapeText } from '../../../lib/shapes/text'

function Input(draw){
	const manager = new EntityManager()
	const points = new RenderEngine(draw.context, manager)
	
	this.touchClick = function ({x, y}, position){
		const {scale} = position
		var point = draw.screenToWorld(position, [x, y])
		console.log(point)
		const pointsSelectable = manager.getEnities(Selectable).map(
			(elem)=>{
				var transform = manager.get(Transform, elem)[0]
				var box = manager.get(ShapeBox, elem)[0]
				var selectable = manager.get(Selectable, elem)[0]
				selectable.isSelected = false
				selectable.index = 0
				return {transform, box, selectable}
			}
		)
		const selected = pointsSelectable.filter(({transform, box, selectable})=>{
			console.log("start",transform.positions[0], transform.positions[1])
			if (transform.positions[0] > point[0] || transform.positions[1] > point[1]) {
				return false
			}
			let end_x = (box.x*scale>1?box.x*scale:1) + transform.positions[0];
			let end_y = (box.y*scale>1?box.y*scale:1) + transform.positions[1];
			console.log("end", end_x, end_y)
			if (end_x < point[0] || end_y < point[1]) {
				return false
			}
			return true
		});
		return selected[0]
	}
	
	var all=[]
	var stabilex=0
	var stabiley=0
	var entity = null
	for(var i = 0 ; i < 5; i ++){
		entity = manager.create()
		manager.asign(new Transform([stabilex,stabiley]), entity)
		manager.asign(new ShapeBox(50,40), entity)
		manager.asign(new Renderer('#555555'), entity)
		manager.asign(new Selectable('#aaffbb'), entity)
		all.push(entity)
		entity = manager.create()
		manager.asign(new Transform([stabilex+5,stabiley+20]), entity)
		manager.asign(new ShapeText(20, "Select"), entity)
		manager.asign(new Renderer('#cccccc'), entity)
		all.push(entity)
		stabilex+= 70;
	}
	
	this.work = function(position){
		points.draw( position )
	}
}

export { Input }