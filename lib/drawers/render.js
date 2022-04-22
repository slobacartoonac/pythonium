import { Transform } from '../physics/transform.js'
import { ShapeBox } from '../shapes/box.js'
import { ShapeCircle } from '../shapes/circle.js'
import { ShapeText } from '../shapes/text.js'

function Renderer(color){
	this.color = color
}

function RenderEngine(context, manager){
	this.context = context
	this.manager = manager
}

RenderEngine.prototype.draw=function(view)
{
	const { context }= this
	var canvasWidth = context.canvas.clientWidth
	var canvasHeight = context.canvas.clientHeight
	const {x: centerX, y: centerY, scale} = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const points = this.manager.getEnities(Renderer).map(
		(elem)=>{
			var transform = this.manager.get(Transform, elem)[0]
			var x=(transform.positions[0]-centerX)*scale + canvasWidthHalf
			var y=(transform.positions[1]-centerY)*scale + canvasHeightHalf
			if(x<0||y<0||x>canvasWidth||y>canvasHeight)
				return
			var renderers = this.manager.get(Renderer, elem)[0]
			var circle = this.manager.get(ShapeCircle, elem)[0]
			if(circle){
				const elementSize=circle.radius*scale>1?circle.radius*scale:1
				context.beginPath()
				context.arc(x,y, elementSize, 0, 2 * Math.PI, false)
				context.fillStyle = renderers.color;
				context.fill()
				context.lineWidth = 1
				context.strokeStyle = '#333333'
				context.stroke()
			}
			var box = this.manager.get(ShapeBox, elem)[0]
			if (box){
				const size_x = box.x*scale>1?box.x*scale:1
				const size_y = box.y*scale>1?box.y*scale:1
				context.beginPath();
				context.rect(x,y, size_x, size_y);
				context.fillStyle = renderers.color;
				context.fill()
				context.lineWidth = 1
				context.strokeStyle = '#333333'
				context.stroke()
			}
			var text = this.manager.get(ShapeText, elem)[0]
			if (text){
				const size_x = text.font*scale>1?text.font*scale:1
				context.fillStyle = renderers.color;
				context.font = parseInt(size_x)+'px serif';
				context.fillText(text.text, x, y);
			}
		}
	)
}
export {RenderEngine, Renderer}
