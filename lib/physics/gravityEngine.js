import { Physics } from './physics.js'
import { Transform } from './transform.js'

function GravityEngine(manager){
	this.manager = manager
	this.physic_entity = null
}

function computeAttraction(
	compute,
	naibors
)
{
	var ret=[0,0]
	naibors.forEach(element => {
		if(element==compute) return
		var distanceX = (element.positions[0]-compute.positions[0])
		var distanceY = (element.positions[1]-compute.positions[1])
		
		var distanceAngle=Math.atan2( distanceY, distanceX )
		var distance=Math.sqrt(
			distanceX*distanceX
			+distanceY*distanceY)

		var forceIntencity = element.mass * compute.mass / (distance * distance)
		var forceComponents={
			x: Math.cos(distanceAngle)*forceIntencity,
			y: Math.sin(distanceAngle)*forceIntencity
		}
		ret[0]+=forceComponents.x
		ret[1]+=forceComponents.y
	})
	return ret
}

GravityEngine.prototype.compute= function()
{

	var physic_entity = this.manager.getEnities(Physics).map((elem)=>{
		var physics = this.manager.get(Physics, elem)[0]
		var transform = this.manager.get(Transform, elem)[0]
		return {
			e: elem,
			mass:  physics.mass,
			physics,
			positions: transform.positions
		}
	})

	for(var i = 0; i< physic_entity.length; i++){
		var elem = physic_entity[i]
		var force = computeAttraction(
			elem,
			physic_entity)
		elem.physics.applyForce(force)
	}
}

export {
	GravityEngine
}