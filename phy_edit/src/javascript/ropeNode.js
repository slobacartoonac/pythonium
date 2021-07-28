
function RNode(positions,speeds,radius,inputs, index)
{
	this.radius=radius
	this.positions=positions?positions:[]
	this.speeds=speeds?speeds:[]
	this.inputs=inputs?inputs:[]
	this.invalid=null
	this.massVolume=5
	this.interaction=20
	this.colisionInteraction=300
	this.distance = 12
	this.g = 0.0001
	this.drag = 0.001
	this.index = index
	this.mass = this.computeMass()
}
RNode.prototype.computeMass= function () {
	return Math.pow(this.radius,3)* Math.PI * this.massVolume
}

RNode.prototype.computeRope = function(compute,naibor,gravity)
{
	var ret=[0,0]

	naibor.forEach(element => {
		var distanceX = (element.positions[0]-compute.positions[0])
		var distanceY = (element.positions[1]-compute.positions[1])
		var distanceAngle=Math.atan2( distanceY, distanceX );
		var distance=Math.sqrt(
			distanceX*distanceX
			+distanceY*distanceY);
		var distanceNormalised = distance / this.distance
		var forceIntencity=(Math.atan((distanceNormalised-1)*5)+Math.pow(distanceNormalised-1,3))
		var forceComponents={
			x: Math.cos(distanceAngle)*forceIntencity,
			y: Math.sin(distanceAngle)*forceIntencity
		};
		ret[0]+=forceComponents.x;
		ret[1]+=forceComponents.y;
	});
	return ret;
};
RNode.prototype.adjustColision = function(compute, naibor)
{
	var ret=[0,0]
	naibor.forEach(element => {
		if(element==this) return;
		var distanceX = (element.positions[0]-compute.positions[0])
		var distanceY = (element.positions[1]-compute.positions[1])
		var distanceAngle=Math.atan2( distanceY, distanceX );
		var distance=Math.sqrt(
			distanceX*distanceX
			+distanceY*distanceY);

		if(distance > this.radius + element.radius) return;

		var distanceNormalised = distance / (this.radius + element.radius)
		var forceIntencity=(Math.pow(distanceNormalised-1,3))
		var forceComponents={
			x: Math.cos(distanceAngle)*forceIntencity,
			y: Math.sin(distanceAngle)*forceIntencity
		};
		ret[0]+=forceComponents.x;
		ret[1]+=forceComponents.y;
	});
	return ret;
};

RNode.prototype.compute=function()
{
	if(this.invalid) return
	var naibor = this.inputs.filter(element => Math.abs(element.index -  this.index) == 1)
	var computed =  this.computeRope(this, naibor)
	var computedC =  this.adjustColision(this, this.inputs)
	var interaction = this.interaction / this.mass
	var colisionInteraction = this.colisionInteraction / this.mass
	for (var i=0;i<this.positions.length;i++)
	{
		this.speeds[i]+=interaction*computed[i]+computedC[i]*colisionInteraction
		this.speeds[i]*= 1 - this.drag
	}
	this.speeds[1]+=this.g
	if(Math.abs(this.positions[0])<100 
	&& this.positions[1]+this.speeds[1]>200 
	&& this.positions[1]<200){
		this.speeds[1]=-this.speeds[1]
	}
}
RNode.prototype.move=function()
{
	for(var k=0;k<this.positions.length;k++){
		this.positions[k]+=this.speeds[k]
	}
}

export default RNode