const squareDistance = (point, nodeB) =>
{
	var square=0
	for(var i=0;i<point.length;i++)
		square+=Math.pow((point[i]-nodeB.positions[i]),2)
	return isNaN(square) || square<1 ? 1 : square
}

var COLORS= 16*16

function MassPloter(context, width,height){
    this.context = context
    this.width = width
    this.height = height
	this.img = this.context.createImageData(this.width, this.height)
}

MassPloter.prototype.draw = function(points, view){
	const {x: centerX, y: centerY, scale} = view
	const { context, width: canvasWidth, height: canvasHeight }= this
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const stepX = 2
	const stepY = 2
	const halfStepX = stepX / 2
	const halfStepY = stepY / 2
	var startx = (centerX + canvasWidthHalf) % stepX
	var starty = (centerY + canvasHeightHalf) % stepY
	var inverseScale = stepY / scale
	for (var x = startx; x <= canvasWidth; x += stepX) {
		var realX = (x - canvasWidthHalf) / scale + centerX
		var realY = (starty - canvasHeightHalf) / scale + centerY
		for (var y = starty; y <= canvasHeight; y += stepY) {
			var sum = 0
			var pointsLength = points.length
			for(var i=0;i<pointsLength;i++){
				var point = points[i]
				sum += 3000 * point.mass / squareDistance([realX , realY],point)
			}
			var colorMin2= Math.min(sum/16.0,COLORS-1)
			var colorMin= Math.max(Math.min(sum,COLORS - 1) - colorMin2*colorMin2*0.3, 0)
			this.imgRect(x - halfStepX, y - halfStepY, stepX, stepY, [colorMin2, 0, colorMin, 255])
			realY += inverseScale
		}
	}
	context.putImageData(this.img, 0, 0)
}

MassPloter.prototype.imgRect=function(x , y, width, height, color)
{
	const realWidth = Math.max(Math.min(width + 1, this.width - x), 0)
	const realHeight = Math.max(Math.min(height + 1, this.height - y),0)
	const realX = Math.max(Math.round(x),0)
	const realY = Math.max(Math.round(y),0)
	const data = this.img.data
	const startX = realX * 4
	const endX = realWidth * 4 + startX 
	const rowLength = this.width * 4
	const startY = realY * rowLength
	const endY = realHeight * rowLength + startY
	for( var i = startY; i < endY; i += rowLength)
	{
		for( var j = startX; j < endX; j += 4)
		{
			var ij=i+j
			data[ij]  = color[0]
			data[ij+1]= color[1]
			data[ij+2]= color[2]
			data[ij+3]= color[3]
		}
	}
}

export default MassPloter