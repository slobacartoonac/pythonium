if (!Math.cbrt) {
	Math.cbrt = function(x) {
		var y = Math.pow(Math.abs(x), 1/3)
		return x < 0 ? -y : y
	}
}
function SNode(positions,speeds,radius,inputs)
{
	this.radius=radius
	this.positions=positions?positions:[]
	this.speeds=speeds?speeds:[]
	this.inputs=inputs?inputs:[]
	this.invalid=null
	this.massVolume=0.1
	this.interaction=0.001
	this.mass = this.computeMass()
}
SNode.prototype.computeMass= function () {
	return Math.pow(this.radius,3)* Math.PI * this.massVolume
}

SNode.prototype.compute=function()
{
	if(this.invalid)return
	this.inputs.forEach(function(element) {
		if(this==element || element.invalid) return
		var squareDist = this.squareDistance( element )
		var realDist = Math.sqrt(squareDist)
		if(realDist < this.radius + element.radius
			&& this.radius > element.radius )
		{
			element.invalid=true
			this.merge(element)
			return
		}
		var asc = this.interaction * element.mass / squareDist
		for (var i=0;i<this.positions.length;i++)
		{
			this.speeds[i]+=asc*(element.positions[i]-this.positions[i])
		}
	}, this)
}
SNode.prototype.merge=function(testNode)
{
	var massA= this.mass
	var massB= testNode.mass
	var newRadious= Math.cbrt((massA+massB)/ Math.PI / this.massVolume)

	for (var i=0;i< this.speeds.length;i++)
	{
		this.speeds[i]=(this.speeds[i] * massA
			+ testNode.speeds[i] * massB)
			/ (massA + massB)
	}
	this.radius=newRadious
	this.mass = this.computeMass()
}
SNode.prototype.squareDistance=function(testNode)
{
	var square=0
	for(var i=0;i<testNode.positions.length;i++)
		square+=Math.pow((testNode.positions[i]-this.positions[i]),2)
	return square
}
SNode.prototype.move=function()
{
	for(var k=0;k<this.positions.length;k++){
		this.positions[k]+=this.speeds[k]
	}
}

export default SNode