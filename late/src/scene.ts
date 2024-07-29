
import { Entity, EntityManager } from '../../lib/ecs'
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { RenderEngine, Renderer } from '../../lib/ecs/drawers/render'
import { ScreenPosition } from '../../lib/fe/screen-position'



import { Input } from './input'
import { Transform } from '../../lib/ecs/physics/transform'
import { ShapeCircle } from '../../lib/shapes/circle'

function gauss(x, mu = 0, sigma = 1) {
    const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
    const exponent = -((x - mu) ** 2) / (2 * sigma ** 2);
    return factor * Math.exp(exponent);
}

let trailProb = .05

function trail(x) {
	return Math.tanh(x*6-4)+Math.tanh(-x*3+4.3)*(1-trailProb) +Math.tanh(-x+4.3)*trailProb
}

let DEVIDEER = 13


class Scene {

	draw: Ploter
	input: Input
	func: (x: number) => number = (x: number) => x;
	manager: EntityManager
	points: any
	chainEngine: any
	physics: any
	entities: Entity[]
	text?: Entity
	fPloter: FunctionPloter

	constructor(draw: Ploter, input: Input){
		this.draw = draw;
		this.input = input;
		let manager = new EntityManager()
		this.manager = manager
		this.points=new RenderEngine(draw.context, this.manager)
		this.entities = [] as Entity[]
		this.fPloter = new FunctionPloter(draw.context)
		this.init()
	}
	setTestText = (text: string) => {
	}
	
	addPoint(x, y, color = '#ff0000'){
		let entity = this.manager.create()
		this.entities.push(entity)
		let pos = new Transform([x*100, y*100])
		this.manager.asign(pos, entity)
		this.manager.asign(new ShapeCircle(4), entity)
		this.manager.asign(new Renderer(color,{color: 'gray', width: 1}), entity)
	}

	init(){
		for(let i = 0; i < 50; i++){
			this.addPoint(i/10, -trail(i/10))
		}
		let twoTasks = {}
		for(let i = 0; i < 50; i++){
			for(let j = 0; j < 50; j++){
				let x1 = i
				let y1 = trail(x1/10)
				let x2 = j
				let y2 = trail(x2/10)
				let finalx = x1+x2
				let finaly = y1*y2/DEVIDEER
				twoTasks[finalx] = twoTasks[finalx] ? twoTasks[finalx]+finaly: finaly
			}
		}
		for(let i = 0; i < 100; i++){
			this.addPoint(i/10, -twoTasks[i]||0, '#00ff00')
		}

		let threeTasks = {}
		for(let i = 0; i < 50; i++){
			for(let j = 0; j < 100; j++){
				let x1 = i
				let y1 = trail(x1/10)
				let x2 = j
				let y2 = twoTasks[x2]
				let finalx = x1+x2
				let finaly = y1*y2/DEVIDEER
				threeTasks[finalx] = threeTasks[finalx] ? threeTasks[finalx]+finaly: finaly
			}
		}
		let fourTasks = {}
		for(let i = 0; i < 50; i++){
			for(let j = 0; j < 100; j++){
				let x1 = i
				let y1 = trail(x1/10)
				let x2 = j
				let y2 = threeTasks[x2]
				let finalx = x1+x2
				let finaly = y1*y2/DEVIDEER
				fourTasks[finalx] = fourTasks[finalx] ? fourTasks[finalx]+finaly: finaly
			}
		}
		for(let i = 0; i < 100; i++){
			this.addPoint(i/10, -twoTasks[i]||0, '#00ff00')
			this.addPoint(i/10, -threeTasks[i]||0, '#0000ff')
			this.addPoint(i/10, -fourTasks[i]||0, '#00ffff')
		}
	}

	
	work = function (position: ScreenPosition) {
		this.fPloter.draw(position, (x)=>trail(x), "black")
		this.points.draw(position)
	}
}

export { Scene }