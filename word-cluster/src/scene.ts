
import { Entity, EntityManager } from '../../lib/ecs'
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { RenderEngine, Renderer } from '../../lib/ecs/drawers/render'
import { ScreenPosition } from '../../lib/fe/screen-position'
import { ChainEngine, ChainLink } from '../../lib/ecs/physics/chainEngine.js'
import { PhysicsEngine, Physics} from '../../lib/ecs/physics/physics.js'
import * as wordDiffCalculator from '../../lib/search/word-difference-calculator'


import { Input } from './input'
import { execute } from 'type-math'
import { wordsList as wFull } from './wordsList'
import { Transform } from '../../lib/ecs/physics/transform'
import { ShapeCircle } from '../../lib/shapes/circle'
import { ShapeText } from '../../lib/shapes/text'

const wordsList =  wFull.filter((item,
        index) => wFull.indexOf(item) === index);

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

shuffleArray(wordsList)
shuffleArray(wordsList)

const muFunc = (dist)=>{
	return (dist-1)*Math.pow(dist,-1)
}

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

	constructor(draw: Ploter, input: Input){
		this.draw = draw;
		this.input = input;
		let manager = new EntityManager()
		this.manager = manager
		this.points=new RenderEngine(draw.context, this.manager)
		this.chainEngine = new ChainEngine(this.manager)
		this.physics=new PhysicsEngine(this.manager, [this.chainEngine])
		this.entities = [] as Entity[]
		setInterval(()=>this.addWord(),300)
	}

	addWord(){
		let w1 = this.entities.length
		let word = wordsList[w1]
		if(w1 > 500) return
		let entity = this.manager.create()
		this.entities.push(entity)
		let pos = new Transform([Math.random()*50-25, Math.random()*50-25])
		this.manager.asign(pos, entity)
		this.manager.asign(new Physics([0,0], 20, 0.05), entity)
		this.manager.asign(new ShapeCircle(2), entity)
		this.manager.asign(new Renderer('#aaffbb'), entity)
		let entity1 = this.manager.create()
		this.manager.asign(pos, entity1)
		this.manager.asign(new ShapeText(8,word), entity1)
		this.manager.asign(new Renderer('#000000',null, 1), entity1)
		if(w1 != 0){
			for(let ws2 in this.entities){
				let w2 = parseInt(ws2) 
				if(w1 == w2) {
					continue
				}
				const prevEntity = this.entities[w2]
				let stabileDistance = 300 * wordDiffCalculator.computeWordDifference(word, wordsList[w2])
				if(stabileDistance > 0.00001){
					this.manager.asign(new ChainLink(prevEntity, stabileDistance, muFunc), entity)
					this.manager.asign(new ChainLink(entity, stabileDistance, muFunc), prevEntity)
				}
			}
		}
	}

	setTestText = (text: string) => {
		if(!text && this.text){
			this.manager.destroy(this.text)
			this.text = undefined
			return
		}
		if(!this.text){
			let entity = this.manager.create()
			this.text = entity
			let pos = new Transform([Math.random()*50-25, Math.random()*50-25])
			this.manager.asign(pos, entity)
			this.manager.asign(new Physics([0,0], 20, 0.05), entity)
			this.manager.asign(new ShapeCircle(2), entity)
			this.manager.asign(new Renderer('#ffaabb'), entity)
			let entity1 = this.manager.create()
			this.manager.asign(pos, entity1)
			
			this.manager.asign(new Renderer('#000000',null, 1), entity1)
		}
		this.manager.get(ChainLink, this.text).forEach((component)=>{
			this.manager.remove(component, this.text)
		})
		this.manager.get(ShapeText, this.text).forEach((component)=>{
			this.manager.remove(component, this.text)
		})
		this.manager.asign(new ShapeText(8,text), this.text)
		for(let ws2 in this.entities){
			let w2 = parseInt(ws2) 
			const prevEntity = this.entities[w2]
			let stabileDistance = 300 * wordDiffCalculator.computeWordDifference(text, wordsList[w2])
			if(stabileDistance < 0.00001){
				stabileDistance = 1
			}
			this.manager.asign(new ChainLink(prevEntity, stabileDistance, muFunc), this.text)
		}
	}
	
	work = function (position: ScreenPosition) {
		this.points.draw(position)
		this.physics.compute()
		if(this.text){
			let loc = this.manager.get(Transform,this.text)[0]
			if(loc){
				position.x = loc.positions.x
				position.y = loc.positions.y
			}
		}
	}
}

export { Scene }