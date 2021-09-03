import Touch from 'my_lib/touch.js'
import { EntityManager } from 'my_lib/ecs.js'

import { ShapeCircle} from 'my_lib/shapes/circle.js'

import { Transform } from 'my_lib/physics/transform.js'

import Ploter from 'my_lib/drawers/ploter.js'
import FPSPloter from 'my_lib/drawers/drawFPS.js'
import GridPloter from 'my_lib/drawers/drawGrid.js'
import { Renderer, RenderEngine } from 'my_lib/drawers/render.js'

import Select from './select.js'
import { Selectable, SelectableRenderEngine } from './select_ecs.js'

const canvas = document.getElementById('phy_canvas')
const selectionTool = document.getElementById('selection_tool')
var draw=new Ploter(canvas, 640,480)

var position={x: 0, y:0, scale:1}

window.addEventListener('mousewheel', function(e){
	position.scale*= e.wheelDelta > 0 ? 1.1 : 0.88
})

const fps=new FPSPloter(draw.context)
const grid = new GridPloter(draw.context, 640, 480)

var manager = new EntityManager()
const points= new RenderEngine(draw.context, 640, 480, manager)
var selection = new Select()
const selectedPoints = new SelectableRenderEngine(draw.context, 640, 480, manager, selection)
document.body.appendChild(canvas)



var touch = new Touch(canvas, 5)
var selectStartPosition = null
var selectPosition = null
touch.sub('force', ({delta,
	startPosition,
	position: mousePositon,
	click
	})=>{
	if(!selectionTool.checked){
		position = {...position, x: position.x - delta.x / position.scale,
			y: position.y - delta.y / position.scale}
		return
	}
	// select tool selection
	selectStartPosition = startPosition
	selectPosition = mousePositon
})

function markSelection(selection){
	console.log(selection)
	selection.forEach((elem, index) => {
		var entity = elem[2]
		var selectable = manager.get(Selectable, entity)[0]
		selectable.isSelected = true
		selectable.index = index;
	});
}

touch.sub('stop',()=>{
	if(selectStartPosition){

		var startX = selectStartPosition.x < selectPosition.x ? selectStartPosition.x : selectPosition.x 
		var startY = selectStartPosition.y < selectPosition.y ? selectStartPosition.y : selectPosition.y 
		var endX = selectStartPosition.x > selectPosition.x ? selectStartPosition.x : selectPosition.x 
		var endY = selectStartPosition.y > selectPosition.y ? selectStartPosition.y : selectPosition.y 

		var pointStart = draw.screenToWorld(position, [startX, startY]);
		var pointEnd = draw.screenToWorld(position, [endX, endY]);
		const points = manager.getEnities(Selectable).map(
			(elem)=>{
				var transform = manager.get(Transform, elem)[0]
				var selectable = manager.get(Selectable, elem)[0]
				selectable.isSelected = false
				selectable.index = 0;
				return [...transform.positions, elem]
			}
		)
		markSelection(selection.areaSelect(pointStart, pointEnd, points))

		selectPosition = null
		selectStartPosition = null
	}
})

touch.sub('click',({x, y})=>{
	var point = draw.screenToWorld(position, [x, y]);
	const points = manager.getEnities(Selectable).map(
		(elem)=>{
			var transform = manager.get(Transform, elem)[0]
			var selectable = manager.get(Selectable, elem)[0]
			selectable.isSelected = false
			selectable.index = 0;
			return [...transform.positions, elem]
		}
	)
	markSelection(selection.pointSelect(point, points, 10))
})


var all=[]
var entity = null

function createObject(x, y, radius){
	entity = manager.create()
	manager.asign(new Transform([x, y]), entity)
	manager.asign(new ShapeCircle(radius), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	manager.asign(new Selectable('#aaffbb'), entity)
	all.push(entity)
}

for(var i = 0 ; i < 10; i ++){
	var angle=Math.random()*2*Math.PI;
	var radius = 30+Math.random()*200;
	var x= Math.sin(angle)*radius;
	var y= Math.cos(angle)*radius;
	var radius= 5
	createObject(x, y, radius)
}

function work(){
	draw.clear()
	grid.draw(100,100,position)
	points.draw( position )
	selectedPoints.draw( position )
	fps.draw()
	setTimeout(work,0)
}
work()