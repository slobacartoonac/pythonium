import Touch from '../../../lib/fe/touch.js'

import Ploter from '../../../lib/ecs/drawers/ploter.js'
import FPSPloter from '../../../lib/ecs/drawers/drawFPS.js'
import GridPloter from '../../../lib/ecs/drawers/drawGrid.js'

import { Scene } from './scene'
import { Input } from './input'

const canvas = document.getElementById('phy_canvas')

function chunkString(str) {
	return str.split(/\r?\n/);
}

var draw = new Ploter(canvas)
var scene = new Scene(draw);
var input = new Input(draw);
var selectionTool = { checked: false }
var playPause = { checked: false }

var buttonMap = {
	[input.addTogle("Selection").id]: selectionTool,
	[input.addTogle("Play").id]: playPause
};
console.log(buttonMap);

var input_position = { x: 0, y: 0, scale: 1 }
var position = { x: 0, y: 0, scale: 1 }

function adjustWindowSize() {
	canvas.width = window.innerWidth - 10;
	canvas.height = window.innerHeight - 10;
	input_position = { x: canvas.width / 2, y: canvas.height / 2, scale: 1 }
}
adjustWindowSize();

window.addEventListener('resize', adjustWindowSize);



var debugString = '0';



window.addEventListener('mousewheel', function (e) {
	position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88
})
document.addEventListener('contextmenu', function (e) {
	e.preventDefault()
});
const fps = new FPSPloter(draw.context)
const grid = new GridPloter(draw.context)

var touch = new Touch(canvas, 100)
touch.sub('force', (props) => {
	var {
		delta,
		deltaZoom,
		isPrimary
	} = props

	if (deltaZoom != 1) {
		position.scale *= deltaZoom
	}

	if (!selectionTool.checked || !isPrimary) {
		position = {
			...position, x: position.x - delta.x / position.scale,
			y: position.y - delta.y / position.scale
		}
		return
	} else {
		scene.touchForce(props, position)
	}
})

touch.sub('stop', (props) => {
	var {
		click,
	} = props
	if (selectionTool.checked && !click) {
		scene.touchStop(props, position);
	}
})

touch.sub('click', (props) => {
	const selected = input.touchClick(props, input_position);
	if (selected) {
		buttonMap[selected.id.id].checked = !buttonMap[selected.id.id].checked
		input.setState(selected.id, buttonMap[selected.id.id].checked)
		return
	}
	scene.touchClick(props, position)
})


function work() {
	draw.clear()
	grid.draw(100, 100, position)
	scene.run = playPause.checked;
	scene.work(position)
	input.work(input_position);
	fps.draw()
	let debug = chunkString(debugString)
	let y = 200;
	for (let i in debug) {
		draw.context.fillText(debug[i], 50, y += 30);
	}

	setTimeout(work, 0)
}
work()