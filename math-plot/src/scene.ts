
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { ScreenPosition } from '../../lib/fe/screen-position'
import { Input } from './input'
import { execute } from 'type-math'

class Scene {
	draw: Ploter
	input: Input
	fPloter: FunctionPloter
	func: (x: number) => number = (x: number) => x;

	constructor(draw: Ploter, input: Input){
		this.draw = draw;
		this.input = input;
		this.fPloter = new FunctionPloter(draw.context)
	}

	setProgram = (program: string) => {
		this.func = (x: number)=>{
			let {res, err} = execute(program, {x})
			if(err){
				this.input.setBaloonText(err)
				console.log(err)
			}
			else {
				this.input.setBaloonText("")
			}
			return res
		}
	}
	
	work = function (position: ScreenPosition) {
		this.fPloter.draw(position, this.func, "black")
	}
}

export { Scene }