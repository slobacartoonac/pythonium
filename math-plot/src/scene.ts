
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { ScreenPosition } from '../../lib/fe/screen-position'
import { Input } from './input'
import { evaluate, getIndentifierTokens, parseProgram } from 'type-math'

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff]

class Scene {
	draw: Ploter
	input: Input
	fPloter: FunctionPloter
	funcArr: Array<(x: number) => number> = [];

	constructor(draw: Ploter, input: Input){
		this.draw = draw;
		this.input = input;
		this.fPloter = new FunctionPloter(draw.context);
		this.funcArr = []
	}

	eval(ast, vars: {[key: string]: number}){
		try {
			let res = evaluate(ast, vars)
			return {res, err: null}
		} catch(e) {
			return {res: null, err: e.message}
		}
	}

	setProgram = (program: string) => {
		this.funcArr = []
		let programs = program.split(/[|;\n]+/).map(p => p.trim()).filter(p => p.length > 0)
		programs.forEach(p => this.addFunction(p))
	}
	addFunction = (program: string) => {
		let tokens = getIndentifierTokens(program)
		let programAst = parseProgram(program)
		let func = (x: number)=>{
			let {res, err} = this.eval(programAst, {[tokens[0]]: x})
			if(err){
				this.input.setBaloonText(err)
				console.log(err)
			}
			else {
				this.input.setBaloonText("")
			}
			return res
		}
		this.funcArr.push(func)
	}
	
	work = function (position: ScreenPosition) {
		this.funcArr.forEach((f, i) => this.fPloter.draw(position, f, colors[i % colors.length]))
	}
}

export { Scene }