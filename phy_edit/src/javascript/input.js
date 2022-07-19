import { EntityManager } from '../../../lib/ecs.js'

import { Transform } from '../../../lib/physics/transform.js'

import { Renderer, RenderEngine } from '../../../lib/drawers/render.js'

import { Selectable } from '../../../lib/drawers/select_ecs.js'
import { ShapeBox } from '../../../lib/shapes/box'
import { ShapeText } from '../../../lib/shapes/text'
import { pointInBox } from '../../../lib/math/box'

function Input(draw) {
	const manager = new EntityManager()
	const points = new RenderEngine(draw.context, manager)

	this.touchClick = function ({ x, y }, position) {
		var point = draw.screenToWorld(position, [x, y])
		console.log(point)
		const pointsSelectable = manager.getEnities(Selectable).map(
			(id) => {
				var transform = manager.get(Transform, id)[0]
				var box = manager.get(ShapeBox, id)[0]
				var selectable = manager.get(Selectable, id)[0]
				selectable.index = 0
				return { transform, box, selectable, id }
			}
		)
		const selected = pointsSelectable.filter(({ transform, box }) => {
			return pointInBox(transform.positions, box, point)
		});
		return selected[0]
	}

	var all = []
	var stabilex = 30
	var stabiley = 30

	this.addTogle = function (text) {
		let shapeText = new ShapeText(20, text)
		let sizeText = points.mesure(shapeText).width;
		let entity = manager.create()
		manager.asign(new Transform([stabilex, stabiley]), entity)
		manager.asign(new ShapeBox(sizeText + 10, 30), entity)
		manager.asign(new Renderer(), entity)
		manager.asign(new Selectable('#aaffbb'), entity)
		all.push(entity)
		let entityText = manager.create()
		manager.asign(new Transform([stabilex + 5, stabiley + 20]), entityText)
		manager.asign(shapeText, entityText)
		manager.asign(new Renderer('#cccccc'), entityText)
		all.push(entityText)
		stabilex += sizeText + 15;
		return entity
	}
	this.setState = function (entity, state) {
		let renderer = manager.get(Renderer, entity)[0]
		if (renderer) {
			renderer.color = state ? '#888888' : '#555555'
		}
	}

	this.work = function (position) {
		points.draw(position)
	}
}

export { Input }