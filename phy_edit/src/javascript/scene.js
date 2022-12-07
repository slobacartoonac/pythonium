import { EntityManager } from '../../../lib/ecs'

import { PhysicsEngine, Physics } from '../../../lib/ecs/physics/physics'
import { ShapeCircle } from '../../../lib/shapes/circle.js'

import { Transform } from '../../../lib/ecs/physics/transform.js'
import { ChainEngine, ChainLink } from '../../../lib/ecs/physics/chainEngine.js'
import { ColisionEngine } from '../../../lib/ecs/physics/colisionEngine.js'
import { Renderer, RenderEngine } from '../../../lib/ecs/drawers/render.js'

import Select from '../../../lib/fe/select'
import { ShapeBox } from '../../../lib/shapes/box'
import { MasCenterRenderEngine, MasCenterRender } from '../../../lib/ecs/drawers/drawMassCenter'

function Scene(draw) {
	const manager = new EntityManager()
	const points = new RenderEngine(draw.context, manager)
	const selection = new Select()
	const physics = new PhysicsEngine(manager, [])
	const drawMassCenter = new MasCenterRenderEngine(draw.context, manager)

	this.touchForce = function ({
		delta, startPosition: selectStartPosition, position: selectPosition
	}, position) {
		var pointStart = draw.screenToWorld(position, Object.values(selectStartPosition))
		var pointEnd = draw.screenToWorld(position, Object.values(selectPosition))
		selection.setArea(pointStart, pointEnd)
	}

	function markSelection(selection, objects) {
		selection.forEach((elem, index) => {
			var { selectable } = objects.find(({ transform }) => transform.positions == elem)
			selectable.isSelected = true
			selectable.index = index
		})
	}

	this.touchStop = function (
		{ startPosition: selectStartPosition,
			position: selectPosition,
		}, position) {
	}

	this.touchClick = function ({ x, y }, position) {

	}

	var all = []
	let rooms = [
		{ name: 'dnevna', x: 0, y: 0, w: 516, h: 482 },
		{ name: 'dnevna-part', x: 399, y: 482, w: 117, h: 144 },
		{ name: 'spavaca', x: 0, y: 482, w: 401, h: 290 },
		{ name: 'hodnik', x: 399, y: 626, w: 117, h: 452 },
		{ name: 'kupatilo', x: 516, y: 817, w: 165, h: 261 },
	]
	for (let room of rooms) {
		var entity = manager.create()
		let { x, y, w, h } = room
		manager.asign(new Transform([x, y]), entity)
		manager.asign(new Physics([0, 0], w * h, 0), entity)
		manager.asign(new ShapeBox(w, h), entity)
		manager.asign(new Renderer('', { color: '#aaffbb', with: 1 }), entity)
		manager.asign(new MasCenterRender(), entity)
		all.push(entity)
	}

	this.work = function (position) {
		points.draw(position)
		drawMassCenter.draw(position)
		if (this.run)
			physics.compute();
	}
}

export { Scene }