function PointsPloter(context, width, height){
    this.context = context
    this.width = width
    this.height = height
}

PointsPloter.prototype.draw=function(points, view)
{
	const { context, width: canvasWidth, height: canvasHeight}= this
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

export default PointsPloter