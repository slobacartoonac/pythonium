function Transform(positions){
	this.positions = positions
}
Transform.prototype.addSpeeds=function(speeds){
	for(var k=0; k< this.positions.length; k++){
		this.positions[k] += speeds[k]
	}
}

export {Transform}