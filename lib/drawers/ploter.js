
function Ploter(canvas,width,height){
	this.canvas=canvas
	this.canvas.width = width || 320
	this.canvas.height = height || 240
	this.context = this.canvas.getContext('2d')
	this.img = this.context.createImageData(this.canvas.width, this.canvas.height)
}

Ploter.prototype.clear=function()
{
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Ploter.prototype.getCanvas=function()
{
	return this.canvas
}

export default Ploter