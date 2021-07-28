
function RNode(positions,speeds,radius,inputs, index)
{
	this.radius=radius
	this.positions=positions?positions:[]
	this.speeds=speeds?speeds:[]
	this.inputs=inputs?inputs:[]
	this.invalid=null
	this.massVolume=0.6
	this.interaction=40
	this.distance = 10
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
		var prewa=Math.atan2(
			(element.positions[1]-compute.positions[1]),
			(element.positions[0]-compute.positions[0])
			);
		var prewd=Math.sqrt((element.positions[0]-compute.positions[0])*(element.positions[0]-compute.positions[0])
		+(element.positions[1]-compute.positions[1])*(element.positions[1]-compute.positions[1]))/this.distance;
		var pf={
			x: Math.cos(prewa)*(Math.atan((prewd-1)*3)*10+(prewd-1)*3),
			y: Math.sin(prewa)*(Math.atan((prewd-1)*3)*10+(prewd-1)*3)
		};
		ret[0]+=pf.x;
		ret[1]+=pf.y;
	});
	return ret;
};

RNode.prototype.compute=function()
{
	if(this.invalid) return
	var naibor = this.inputs.filter(element => Math.abs(element.index -  this.index) == 1)
	var computed =  this.computeRope(this, naibor)
	var interaction = this.interaction / this.mass
	for (var i=0;i<this.positions.length;i++)
	{
		this.speeds[i]+=interaction*computed[i]
		this.speeds[i]*= 1 - this.drag
	}
}
RNode.prototype.move=function()
{
	for(var k=0;k<this.positions.length;k++){
		this.positions[k]+=this.speeds[k]
	}
}

export default RNode