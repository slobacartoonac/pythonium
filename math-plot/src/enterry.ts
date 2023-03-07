import Touch from '../../lib/fe/touch'
import Ploter from '../../lib/ecs/drawers/ploter'
import GridPloter from '../../lib/ecs/drawers/drawGrid'
import { Scene } from './scene'

import { ScreenPosition } from '../../lib/fe/screen-position'
import { Input } from './input'
import debounce from 'debounce'


export function createGame(canvas: HTMLCanvasElement, gameResult: (timeLeft: number)=>void){
var draw = new Ploter(canvas)
var input = new Input(draw);
var position = new ScreenPosition(canvas, {
	minX: -2000,
	minY: -2000,
	maxX: 2000,
	maxY: 2000,
	minScale: 0.15,
	maxScale: 3
})
var scene = new Scene(draw, input) ;

function adjustWindowSize() {
	input.setResolution()
}

var touch = new Touch(canvas, 20)
touch.throw_error = true

window.addEventListener('mousewheel', function (e: any) {
		position.zoom(e.wheelDelta > 0 ? 1.1 : 0.88, touch.centerPosition.x, touch.centerPosition.y)
})

document.addEventListener('contextmenu', function (e) {
	e.preventDefault()
});

let program_text = document.getElementById('program_text')
let debounced = debounce(scene.setProgram,200)
program_text.addEventListener('input',(ev: Event)=>{
	// @ts-ignore
	debounced(ev.target.value)
})

// const fps = new FPSPloter(draw.context)
const grid = new GridPloter(draw.context, { axisCords: true, devide: 4, showAxis: true })


let noMove = false;
let firstPass = false;

touch.onForce((props: any) => {
	var {
		delta,
		deltaZoom,
		isPrimary,
		centerPosition,
		position: evPosition,
		isClick
	} = props
	if (deltaZoom != 1) {
		position.zoom(deltaZoom, centerPosition.x, centerPosition.y)
	}
	position.move(delta.x, delta.y)
	return
})

touch.onStop( (props: any) => {
	noMove = false
	firstPass = false
})

touch.onClick((props: any) => {
	const selected = input.touchClick(props);
	if (selected) {
		return
	}
})


function work() {
	draw.clear()
	grid.draw(100, 100, position)
	scene.work(position)
	input.work();
}

return {work, adjustWindowSize }
}