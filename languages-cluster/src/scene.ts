
import { Entity, EntityManager } from '../../lib/ecs'
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { RenderEngine, Renderer } from '../../lib/ecs/drawers/render'
import { ScreenPosition } from '../../lib/fe/screen-position'
import { ChainEngine, ChainLink } from '../../lib/ecs/physics/chainEngine.js'
import { PhysicsEngine, Physics} from '../../lib/ecs/physics/physics.js'
import * as wordDiffCalculator from '../../lib/search/word-difference-calculator'


import { Input } from './input'
import { Transform } from '../../lib/ecs/physics/transform'
import { ShapeCircle } from '../../lib/shapes/circle'
import { ShapeText } from '../../lib/shapes/text'
import { Language, languages } from './languages'
import { programmers } from './programmers'

class LangPoint implements Language {
	name: string
	learning_curve: number
	syntax_complexity: number
	logic_complexity: number
	memory_management_ease: number
	similarity_to_other_languages: number
	community_support: number
	ecosystem: number
	performance: number
	distance_from_machine_code: number
	parameter_strictness: number
	prevention_of_runtime_bugs: number
	constructor({
		name,
		learning_curve,
		syntax_complexity,
		logic_complexity,
		memory_management_ease,
		similarity_to_other_languages,
		community_support,
		ecosystem,
		performance,
		distance_from_machine_code,
		parameter_strictness,
		prevention_of_runtime_bugs,
	}:Language){
		this.name = name
		this.learning_curve = learning_curve
		this.syntax_complexity = syntax_complexity
		this.logic_complexity = logic_complexity
		this.memory_management_ease = memory_management_ease
		this.similarity_to_other_languages = similarity_to_other_languages
		this.community_support = community_support
		this.ecosystem = ecosystem
		this.performance = performance
		this.distance_from_machine_code = distance_from_machine_code
		this.parameter_strictness = parameter_strictness
		this.prevention_of_runtime_bugs = prevention_of_runtime_bugs
	}
}

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
		setInterval(()=>this.addProgrammer(),300)
		
	}
	
	words = 0
	addWord(){
		let w1 = this.words
		this.words ++
		let language = languages[w1] && new LangPoint(languages[w1])
		if(!language || w1 > 500) return
		let entity = this.manager.create()
		this.entities.push(entity)
		let pos = new Transform([Math.random()*50-25, Math.random()*50-25])
		this.manager.asign(pos, entity)
		this.manager.asign(new Physics([0,0], 20, 0.05), entity)
		this.manager.asign(new ShapeCircle(2), entity)
		this.manager.asign(new Renderer('#333333'), entity)
		this.manager.asign(language, entity)


		const properties = [
			'learning_curve',
			'logic_complexity',
			'memory_management_ease',
			'similarity_to_other_languages',
			'syntax_complexity',
			'community_support',
			'ecosystem',
			'performance',
			'distance_from_machine_code',
			'parameter_strictness',
			'prevention_of_runtime_bugs'
		  ];
		  const entity0 = this.manager.create();
		  this.manager.asign(pos, entity0);
		  this.manager.asign(new ShapeText(12, language.name), entity0);
		  this.manager.asign(new Renderer('#000044', null, 1), entity0);

		  for (const property of properties) {
			const entity1 = this.manager.create();
			const propertyName = property.replace(/_/g, ' ');
			this.manager.asign(pos, entity1);
			this.manager.asign(new Transform([0, properties.indexOf(property) * 12+14]), entity1);
			this.manager.asign(new ShapeText(10, `${propertyName}: ${language[property]}`), entity1);
			this.manager.asign(new Renderer('#333333', null, 1), entity1);
		  }
		if(w1 != 0){
			for(let prevEntity of this.entities){
				if(prevEntity == entity) continue;
				const prevLangPoint = this.manager.get(LangPoint, prevEntity)[0]
				let stabileDistance = 30+100 * computeWordDifference(language, prevLangPoint)
				if(stabileDistance > 0.00001){
					this.manager.asign(new ChainLink(prevEntity, stabileDistance, muFunc), entity)
					this.manager.asign(new ChainLink(entity, stabileDistance, muFunc), prevEntity)
				}
			}
		}
	}
	programmers = 0
	addProgrammer(){
		let w1 = this.programmers
		this.programmers ++
		let programer = programmers[w1] && new LangPoint(programmers[w1])
		if(!programer || w1 > 500) return
		let entity = this.manager.create()
		this.entities.push(entity)
		let pos = new Transform([Math.random()*50-25, Math.random()*50-25])
		this.manager.asign(pos, entity)
		this.manager.asign(new Physics([0,0], 20, 0.05), entity)
		this.manager.asign(new ShapeCircle(2), entity)
		this.manager.asign(new Renderer('#336633'), entity)
		this.manager.asign(programer, entity)
		const properties = [
			'learning_curve',
			'logic_complexity',
			'memory_management_ease',
			'similarity_to_other_languages',
			'syntax_complexity',
			'community_support',
			'ecosystem',
			'performance',
			'distance_from_machine_code',
			'parameter_strictness',
			'prevention_of_runtime_bugs'
		  ];
		  const entity0 = this.manager.create();
		  this.manager.asign(pos, entity0);
		  this.manager.asign(new ShapeText(12, programer.name), entity0);
		  this.manager.asign(new Renderer('#006600', null, 1), entity0);
		if(w1 != 0){
			for(let prevEntity of this.entities){
				if(prevEntity == entity) continue;
				const prevLangPoint = this.manager.get(LangPoint,prevEntity)[0]
				let stabileDistance = 30+100 * computeWordDifference(programer, prevLangPoint)
				if(stabileDistance > 0.00001){
					this.manager.asign(new ChainLink(prevEntity, stabileDistance, muFunc), entity)
					this.manager.asign(new ChainLink(entity, stabileDistance, muFunc), prevEntity)
				}
			}
		}
	}


	setTestText = (text: string) => {
		// if(!text && this.text){
		// 	this.manager.destroy(this.text)
		// 	this.text = undefined
		// 	return
		// }
		// if(!this.text){
		// 	let entity = this.manager.create()
		// 	this.text = entity
		// 	let pos = new Transform([Math.random()*50-25, Math.random()*50-25])
		// 	this.manager.asign(pos, entity)
		// 	this.manager.asign(new Physics([0,0], 20, 0.05), entity)
		// 	this.manager.asign(new ShapeCircle(2), entity)
		// 	this.manager.asign(new Renderer('#ffaabb'), entity)
		// 	let entity1 = this.manager.create()
		// 	this.manager.asign(pos, entity1)
			
		// 	this.manager.asign(new Renderer('#000000',null, 1), entity1)
		// }
		// this.manager.get(ChainLink, this.text).forEach((component)=>{
		// 	this.manager.remove(component, this.text)
		// })
		// this.manager.get(ShapeText, this.text).forEach((component)=>{
		// 	this.manager.remove(component, this.text)
		// })
		// this.manager.asign(new ShapeText(8,text), this.text)
		// for(let ws2 in this.entities){
		// 	let w2 = parseInt(ws2) 
		// 	const prevEntity = this.entities[w2]
		// 	let stabileDistance = 300 * wordDiffCalculator.computeWordDifference(text, wordsList[w2])
		// 	if(stabileDistance < 0.00001){
		// 		stabileDistance = 1
		// 	}
		// 	this.manager.asign(new ChainLink(prevEntity, stabileDistance, muFunc), this.text)
		// }
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

function computeWordDifference(
	word: Language,
	word2: Language) {
	return Math.sqrt(
		Math.pow(word.learning_curve - word2.learning_curve, 2) +
		Math.pow(word.logic_complexity - word2.logic_complexity, 2) +
		Math.pow(word.memory_management_ease - word2.memory_management_ease, 2) +
		Math.pow(word.similarity_to_other_languages - word2.similarity_to_other_languages, 2) +
		Math.pow(word.syntax_complexity - word2.syntax_complexity, 2) +
		Math.pow(word.community_support - word2.community_support, 2) +
		Math.pow(word.ecosystem - word2.ecosystem, 2) +
		Math.pow(word.performance - word2.performance, 2) +
		Math.pow(word.distance_from_machine_code - word2.distance_from_machine_code, 2)
	  )
}
