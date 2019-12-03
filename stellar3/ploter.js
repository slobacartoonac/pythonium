

function Ploter(canvas,width,height){
	this.canvas=canvas;
	this.canvas.width = width || 320
	this.canvas.height = height || 240
	this.context = this.canvas.getContext('2d')
	this.img = this.context.createImageData(this.canvas.width, this.canvas.height)
}

Ploter.prototype.points=function(points, view)
{
	const { context, canvas: {width: canvasWidth, height: canvasHeight} }= this
	const {x: centerX, y: centerY, scale} = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
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

Ploter.prototype.getCanvas=function()
{
	return this.canvas
}

export default Ploter