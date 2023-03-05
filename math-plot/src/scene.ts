
import FunctionPloter from '../../lib/ecs/drawers/drawFunction'
import Ploter from '../../lib/ecs/drawers/ploter'
import { ScreenPosition } from '../../lib/fe/screen-position'
import { Input } from './input'
import { execute } from 'type-math'

function Scene(draw: Ploter, input: Input) {
	const fPloter = new FunctionPloter(draw.context)
	this.setProgram = (program: string) => {
		this.func = (x: number)=>{
			let {res, err} = execute(program, {x})
			if(err){
				input.setBaloonText(err)
				console.log(err)
			}
			else {
				input.setBaloonText("")
			}
			return res
		}
	}

	this.func = (x: number) => x;
	
	this.work = function (position: ScreenPosition) {
		fPloter.draw(position, this.func, "black")
	}
}

export { Scene }