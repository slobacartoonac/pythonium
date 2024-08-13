
import { Entity, EntityManager } from '../../lib/ecs'
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { RenderEngine, Renderer } from '../../lib/ecs/drawers/render'
import { ScreenPosition } from '../../lib/fe/screen-position'

import { Input } from './input'
import { Transform } from '../../lib/ecs/physics/transform'
import { ShapeCircle } from '../../lib/shapes/circle'
import { ShapeText } from '../../lib/shapes/text'
import { ShapeNoScale } from '../../lib/shapes/noScale'

const DEVIDEER = 14
const AREA_UNDER_CURVE = 20
const STEPS = 10

function tail(x, tailProb) {
	return Math.tanh(x*6-4)+Math.tanh(-x*3+4.3)*(1-tailProb) +Math.tanh(-x+4.3)*tailProb
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
	fPloter: FunctionPloter
	trailProb: number = .05
    taskNumber: number = 6
	perfectTask = {}
	normCurves: false

	constructor(draw: Ploter, input: Input){
		this.draw = draw;
		this.input = input;
		let manager = new EntityManager()
		this.manager = manager
		this.points=new RenderEngine(draw.context, this.manager)
		this.entities = [] as Entity[]
		this.fPloter = new FunctionPloter(draw.context)
		this.perfectTask = {}
		for(let i = 0; i < 200; i++){
			this.perfectTask[i] =  tail(i/STEPS, 0)
		}
		this.normalizeTask(this.perfectTask)
		this.init()
	}

	addPoint(x, y, color = '#ff0000'){
		let entity = this.manager.create()
		this.entities.push(entity)
		let pos = new Transform([x*100, y*100])
		this.manager.asign(pos, entity)
		this.manager.asign(new ShapeCircle(4), entity)
		this.manager.asign(new Renderer(color,{color: 'gray', width: 1}), entity)
		return entity
	}

	init(){
		this.entities.forEach(e=>this.manager.destroy(e))
		this.entities = []

		let oneTask = {}
		for(let i = 0; i < 200; i++){
			oneTask[i] =  tail(i/STEPS, this.trailProb)
		}

		this.normalizeTask(oneTask)

		this.calcFail(oneTask,this.perfectTask,'#ff0000', 0)


		let colors = ['#ff0000','#00ff00','#0000ff','#00ffff']
		let colorsGray = ['#aa4444','#44aa44','#4444aa','#44aaaa']
		let twoTasks = this.combineTwoTasks(oneTask, oneTask)
		let threeTasks = this.combineTwoTasks(oneTask, twoTasks)
		let nTasks = oneTask
		let niceTask = this.perfectTask
		for(let i = 0; i < this.taskNumber; i++){
			nTasks = this.combineTwoTasks(oneTask, nTasks)
			niceTask = this.combineTwoTasks(this.perfectTask, niceTask)
			this.calcFail(nTasks,niceTask, colors[i+1]||'#00ffff', i+1)
		}

		this.plotCumulative(this.perfectTask,'#aa4444')
		this.plotChange(this.perfectTask,'#aa4444')
		this.plotCumulative(niceTask, colorsGray[this.taskNumber]||'#44aaaa')
		this.plotChange(niceTask, colorsGray[this.taskNumber]||'#44aaaa')

		this.plotChange(oneTask)
		this.plotChange(twoTasks, '#00ff00')
		this.plotChange(threeTasks, '#0000ff')
		this.plotChange(nTasks, '#00ffff')


		this.plotCumulative(oneTask)
		this.plotCumulative(twoTasks, '#00ff00')
		this.plotCumulative(threeTasks, '#0000ff')
		this.plotCumulative(nTasks, '#00ffff')
		
	}

	plotChange(task, color?){
		let scale = this.normCurves ? -2/Math.max(...Object.values(task) as any) : -1 
		for(let i = 0; i < 200; i++){
			this.addPoint(i/STEPS,scale * (task[i]||0), color)
		}
	}

	plotCumulative(task, color?){
		let sum = 0
		for(let i = 0; i < 200; i++){
			sum +=  (task[i] || 0) / AREA_UNDER_CURVE * 2
			this.addPoint(i/STEPS,- 3 -sum, color)
		}
	}

	combineTwoTasks(task1, task2) {
		let twoTasks = {}
		for(let i = 0; i < 100; i++){
			for(let j = 0; j < 200; j++){
				let y1 = task1[i]
				let y2 = task2[j]
				let finalx = i+j
				let finaly = y1*y2/DEVIDEER
				twoTasks[finalx] = twoTasks[finalx] ? twoTasks[finalx] + finaly: finaly
			}
		}

		this.normalizeTask(twoTasks)

		return twoTasks
	}

	normalizeTask(task){
		let sum = 0
		for(let i = 0; i < 200; i++){
			sum += task[i] 
		}
		sum /= AREA_UNDER_CURVE
		for(let i = 0; i < 200; i++){
			task[i] /= sum  
		}
	}

	setNormCurves(value){
		this.normCurves = value
		this.init()
	}

	calcFail(task, niceTask, color, index){
		let raz = 0
		let nominalSucces = 0
		let success = 0
		for(let i = 0; i < 200; i++){
			nominalSucces += niceTask[i]
			success += task[i]
			let razCond = nominalSucces - success
			if(razCond > 0.001){
				raz += razCond
			}
		}

		let ent = this.addPoint(1+index,-2.7, color)
		this.manager.asign(new ShapeNoScale(), ent)
		this.manager.asign(new ShapeText(15, '%'+(raz*2 / AREA_UNDER_CURVE).toFixed(2)), ent)
	}

	setTask(setTask: any) {
		let setTaskParsed = parseFloat(setTask)
		if(isFinite(setTaskParsed)){
			this.taskNumber = setTaskParsed
			this.init()
		}
	}
	setTail(setTail: any) {
		let setTailParsed = parseFloat(setTail)
		if(isFinite(setTailParsed)){
			this.trailProb = setTailParsed/100
			this.init()
		}
	}
	
	work(position: ScreenPosition) {
		//this.fPloter.draw(position, (x)=>(-3+tail(x, this.trailProb)), "black")
		//this.fPloter.draw(position, (x)=>(-2.05+tail(x-this.taskNumber, 0)), "green")
		this.points.draw(position)
	}
}

export { Scene }