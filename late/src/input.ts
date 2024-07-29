import { Entity, EntityManager } from '../../lib/ecs'

import { Transform } from '../../lib/ecs/physics/transform.js'
import { createTextBaloon } from '../../lib/ecs/bundle/baloon'

import { Renderer, RenderEngine } from '../../lib/ecs/drawers/render.js'

import { Selectable } from '../../lib/ecs/drawers/select_ecs.js'
import { ShapeBox } from '../../lib/shapes/box'
import { ShapeText } from '../../lib/shapes/text'
import { pointInBox } from '../../lib/math/box'

import { PointXY } from '../../lib/shapes/pointXY'
import { CheckState } from '../../lib/shapes/checked'
import Ploter from '../../lib/ecs/drawers/ploter'
import { ScreenPosition } from '../../lib/fe/screen-position'

class Dialoge{}

class Input {
	ploter: Ploter
	manager: EntityManager
	render: RenderEngine
	all: Array<Entity>
	stabilex: number
	stabiley: number
	inputs: {[key:string]: Entity}
	input_position: ScreenPosition
	timer: number
	baloonText: string

	constructor(draw: Ploter){
		this.ploter = draw
		this.manager = new EntityManager()
		this.render = new RenderEngine(this.ploter.context, this.manager)
		this.input_position = new ScreenPosition(draw.canvas)
		this.stabilex = 30
		this.stabiley = 30
		this.inputs = {}
		this.baloonText = ''
	}
	public getWith(){
		return this.ploter.canvas.width
	}
	public getHeight(){
		return this.ploter.canvas.height
	}

	public setResolution(){
		this.input_position.x = this.getWith() / 2
		this.input_position.y = this.getHeight() / 2
	}

	public touchClick({ x, y }:PointXY) {
		var point = this.ploter.screenToWorld(this.input_position, [x, y])
		const pointsSelectable = this.manager.getEnities(Selectable).map(
			(id) => {
				var transform = this.manager.get(Transform, id)[0]
				var box = this.manager.get(ShapeBox, id)[0]
				var selectable = this.manager.get(Selectable, id)[0]
				selectable.index = 0
				return { transform, box, selectable, id }
			}
		)
		const selected = pointsSelectable.filter(({ transform, box }) => {
			return pointInBox(transform.positions, [box.x, box.y], point)
		})[0];
		if (selected) {
			let checked = this.manager.get(CheckState, selected.id)[0]
			if (checked) {
				this.setState(selected.id, !checked.checked)
			}
		}
		return selected
	}

	public addTogle(text: string) {
		let shapeText = new ShapeText(20, text)
		let sizeText = this.render.mesure(shapeText).width;
		let entity = this.manager.create()
		this.manager.asign(new Transform([this.stabilex, this.stabiley]), entity)
		this.manager.asign(new ShapeBox(sizeText + 10, 30), entity)
		this.manager.asign(new Renderer('#555555'), entity)
		this.manager.asign(new Selectable(), entity)
		this.manager.asign(new CheckState(false), entity)
		this.all.push(entity)
		let entityText = this.manager.create()
		this.manager.asign(new Transform([this.stabilex + 5, this.stabiley]), entityText)
		this.manager.asign(shapeText, entityText)
		this.manager.asign(new Renderer('#cccccc'), entityText)
		this.all.push(entityText)
		this.stabilex += sizeText + 15;
		this.inputs[text] = entity
		return entity
	}
	public getCheckedByText(text: string) {
		if (!this.inputs[text]) return false
		let checked = this.manager.get(CheckState, this.inputs[text])[0]
		if (checked) {
			return checked.checked
		}
		return false
	}
	public setState(entity: Entity, state: boolean) {
		let renderer = this.manager.get(Renderer, entity)[0]
		if (renderer) {
			renderer.color = state ? '#888888' : '#555555'
		}
		let checked = this.manager.get(CheckState, entity)[0]
		if (checked) {
			checked.checked = state
		}
	}

	public setBaloonText(text: string){
		if(this.baloonText==text){
			return
		}
		this.baloonText=text
		this.manager.getEnities(Dialoge).forEach((el) => {
			this.manager.destroy(el)
		})
		if(!this.baloonText) return
		let entities = createTextBaloon(this.manager,
			this.render,
			[this.getWith()-126, this.getHeight()- 30],
			this.baloonText,
		{
			textSize: 20,
			maxWidth: this.getWith() - 136,
			minWidth: this.getWith() - 136,
			anchor:[1,1],
			borderColor: '#aaaaaa',
			background: '#aaaaaaaa'
		})
		entities.map((el: Entity)=>this.manager.asign(new Dialoge(), el))
	
	}

	public work() {
		this.render.draw(this.input_position)
	}
}

export { Input }