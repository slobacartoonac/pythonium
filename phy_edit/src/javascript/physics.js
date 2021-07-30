function Physics(speeds, mass){
	this.speeds = speeds
	this.mass = mass
	this.drag = 0.001
}


Physics.prototype.applyForce=function(force)
{
	for (var i=0;i<this.speeds.length;i++)
	{
		this.speeds[i]+= force[i]
		this.speeds[i]*= 1 - this.drag
	}
}

function PhysicsEngine(manager, engines){
	this.manager = manager
	this.engines = engines
}

PhysicsEngine.prototype.compute = function(){
	this.engines.forEach(engine => engine.compute())
	this.manager.getEnities(Physics).forEach(elem => {
		var physics = this.manager.get(Physics, elem)[0]
		var transform = this.manager.get(Transform, elem)[0]
		for(var k=0;k< transform.positions.length;k++){
			transform.positions[k] += physics.speeds[k]
		}
	})
}


function ShapeCircle(radius){
	this.radius = radius
}
function Transform(positions){
	this.positions = positions
}

export {PhysicsEngine, Physics,  ShapeCircle, Transform}