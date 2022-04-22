import Touch from 'my_lib/touch.js'

import Ploter from 'my_lib/drawers/ploter.js'
import FPSPloter from 'my_lib/drawers/drawFPS.js'
import GridPloter from 'my_lib/drawers/drawGrid.js'

import { Scene } from './scene'
import { Input } from './input'

const canvas = document.getElementById('phy_canvas')

var draw=new Ploter(canvas)
var scene=new Scene(draw);
var input=new Input(draw);
var selectionTool = {checked: false}



window.addEventListener('resize', adjustWindowSize);

var position={x: 0, y:0, scale:1}
var input_position = {x: 0,y: 0, scale: 1}

function adjustWindowSize(){
	canvas.width  = window.innerWidth - 10;
	canvas.height = window.innerHeight - 10;
	input_position = {x: canvas.width / 2,y: canvas.height / 2, scale: 1}
}
adjustWindowSize();

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})
document.addEventListener('contextmenu', function(e) {
	e.preventDefault()
});
const fps=new FPSPloter(draw.context)
const grid = new GridPloter(draw.context)

var touch = new Touch(canvas, 100)
touch.sub('force', (props)=>{
	var {
		delta,
	} = props
	if(!selectionTool.checked){
		position = {...position, x: position.x - delta.x / position.scale,
			y: position.y - delta.y / position.scale}
		return
	} else {
		scene.touchForce(props, position)
	}
})

touch.sub('stop',( props )=>{
	var {
		click,
	} = props
	if(selectionTool.checked && !click){
		scene.touchStop(props, position);
	}
})

touch.sub('click',(props)=>{
	if(input.touchClick(props, input_position)){
		console.log("touchClick")
		selectionTool.checked = !selectionTool.checked 
		return
	}
	scene.touchClick(props, position)
})


function work(){
	draw.clear()
	grid.draw(100,100,position)
	scene.work(position)
	input.work(input_position);
	fps.draw()
	setTimeout(work,0)
}
work()