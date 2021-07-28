
function GridPloter(ctx, width,height){
	this.context = ctx
    this.width = width
    this.height = height
}

GridPloter.prototype.draw=function(sizex,sizey, view)
{
	const { context, width: canvasWidth, height: canvasHeight }= this
	const {x: centerX, y: centerY, scale} = view
	const canvasWidthHalf = canvasWidth / 2
	const canvasHeightHalf = canvasHeight / 2
    var gridScale = scale
    while(gridScale> 2)
        gridScale /= 2
    while(gridScale< 0.5)
        gridScale *= 2
	const stepX = sizex * gridScale
	const stepY = sizey * gridScale
    var startx=( -centerX * scale + canvasWidthHalf) % stepX
    var starty=( -centerY * scale + canvasHeightHalf) % stepY
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

GridPloter.prototype.line=function(startx,starty,sizex,sizey,color)
{
	this.context.lineWidth = 1
	this.context.moveTo( startx , starty)
	this.context.lineTo( startx + sizex, starty + sizey )
	this.context.strokeStyle = color
	this.context.stroke()
}

export default GridPloter