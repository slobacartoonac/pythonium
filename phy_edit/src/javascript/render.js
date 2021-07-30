import { ShapeCircle, Transform } from './physics.js'

function Renderer(color){
	this.color = color
}
function RenderEngine(context, width, height, manager){
	this.context = context
	this.width = width
	this.height = height
	this.manager = manager
}

RenderEngine.prototype.draw=function(view)
{
	const { context, width: canvasWidth, height: canvasHeight}= this
	const {x: centerX, y: centerY, scale} = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const points = this.manager.getEnities(Renderer).map(
		(elem)=>{
			var renderers = this.manager.get(Renderer, elem)[0]
			var transform = this.manager.get(Transform, elem)[0]
			var circle = this.manager.get(ShapeCircle, elem)[0]
			return [
				transform.positions[0],
				transform.positions[1],
				circle.radius,
				renderers.color
			]
		}
	)
	points.forEach((element)=>{
		var x=(element[0]-centerX)*scale + canvasWidthHalf
		var y=(element[1]-centerY)*scale + canvasHeightHalf
		if(x<0||y<0||x>canvasWidth||y>canvasHeight)
			return
		const elementSize=element[2]*scale>1?element[2]*scale:1
		context.beginPath()
		context.arc(x,y, elementSize, 0, 2 * Math.PI, false)
		context.fillStyle = element[3]
		context.fill()
		context.lineWidth = 1
		context.strokeStyle = '#333333'
		context.stroke()
	})
}
export {RenderEngine, Renderer as Render}
