
const squareDistance = (point, nodeB) =>
{
	var square=0
	for(var i=0;i<point.length;i++)
		square+=Math.pow((point[i]-nodeB.positions[i]),2)
	return isNaN(square) || square<1 ? 1 : square
}

var COLORS= 16*16

function Ploter(width,height){

	this.canvas = document.createElement('canvas')
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

Ploter.prototype.drawMass = function(points, view){
	const {x: centerX, y: centerY, scale} = view
	const { context, canvas: {width: canvasWidth, height: canvasHeight} }= this
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	const stepX = 10
	const stepY = 10
	const halfStepX = stepX / 2
	const halfStepY = stepY / 2
	var startx = (centerX + canvasWidthHalf) % stepX
	var starty = (centerY + canvasHeightHalf) % stepY
	for (var x = startx; x <= canvasWidth; x += stepX) {
		for (var y = starty; y <= canvasHeight; y += stepY) {
			var realX= (x - canvasWidthHalf) / scale + centerX   //(element[0]-centerX)*scale + canvasWidthHalf
			var realY= (y - canvasHeightHalf) / scale + centerY 
			var sum = points.reduce((sum,point)=> {
				var dist = squareDistance([realX , realY],point)
				if(!dist) return sum
				return sum + 3000 * point.mass / dist },
			0)
			var colorMin=Math.min(Math.round(sum),COLORS)
			var colorMin2=Math.min(Math.round(sum/16.0),COLORS)
			if(colorMin < 5 && colorMin2 < 5) continue
			var color=Math.round(colorMin).toString(16)
			var color2=Math.round(colorMin2).toString(16)
			context.beginPath()
			context.rect(x - halfStepX, y - halfStepY, stepX+1, stepY+1)
			context.fillStyle = '#'+
				[...Array(2)].map((_,i)=>color2[i + color2.length - 2]||'0').join('')+
				'00'+
				[...Array(2)].map((_,i)=>color[i + color.length - 2]||'0').join('')
			context.fill()
		}
	}
}

Ploter.prototype.drawMass2 = function(points, view){
	const {x: centerX, y: centerY, scale} = view
	const { context, canvas: {width: canvasWidth, height: canvasHeight} }= this
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

Ploter.prototype.imgRect=function(x , y, width, height, color)
{
	const realWidth = Math.max(Math.min(width + 1, this.canvas.width - x), 0)
	const realHeight = Math.max(Math.min(height + 1, this.canvas.height - y),0)
	const realX = Math.max(Math.round(x),0)
	const realY = Math.max(Math.round(y),0)
	const data = this.img.data
	const startX = realX * 4
	const endX = realWidth * 4 + startX 
	const rowLength = this.canvas.width * 4
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

Ploter.prototype.clear=function()
{
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Ploter.prototype.grid=function(sizex,sizey, view)
{
	const { context, canvas: {width: canvasWidth, height: canvasHeight} }= this
	const {x: centerX, y: centerY, scale} = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
	let gridScale = scale
	const stepX = sizex * gridScale
	const stepY = sizey * gridScale

	var startx = (centerX * gridScale + canvasWidthHalf) % stepX
	var starty = (centerY * gridScale + canvasHeightHalf) % stepY
	context.beginPath()
	for (var x = startx; x <= canvasWidth; x += stepX) {
		context.moveTo( x , 0)
		context.lineTo( x, canvasHeight)
	}

	for (var y = starty; y <= canvasHeight; y += stepY) {
		context.moveTo( 0, y )
		context.lineTo( canvasWidth , y)
	}
	context.lineWidth = 2
	context.strokeStyle = 'gray'
	context.stroke()
	context.font = '10px Arial'
	context.fillText((Math.round(view.x * 100) / 100 + Number.EPSILON)+','+(Math.round(view.y * 100 + Number.EPSILON) / 100)+','+(Math.round(view.scale * 100 + Number.EPSILON) / 100),10,50)

}
Ploter.prototype.line=function(startx,starty,sizex,sizey,color)
{

	this.context.lineWidth = 1
	this.context.moveTo( startx , starty)
	this.context.lineTo( startx + sizex, starty + sizey )
	this.context.strokeStyle = color
	this.context.stroke()
}

Ploter.prototype.getCanvas=function()
{
	return this.canvas
}

export default Ploter