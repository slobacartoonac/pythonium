import { Renderer } from '../../lib/ecs/drawers/render.js'
import { ShapeCircle } from '../../lib/shapes/circle.js'
import { Physics } from '../../lib/ecs/physics/physics.js'

function GravityColorEngine(manager) {
	this.manager = manager
}

const planetColors = [
	[245, 202, 117],
	[254, 255, 188],
	[200, 141, 110],
]

GravityColorEngine.prototype.compute = function () {
	this.manager.getEnities(Renderer).map(
		(elem) => {
			var renderers = this.manager.get(Renderer, elem)[0]
			var mass = this.manager.get(Physics, elem)[0].mass
			var volume = Math.pow(this.manager.get(ShapeCircle, elem)[0].radius, 3) * Math.PI
			var dencity = mass / volume * planetColors.length * 3
			var index = Math.min(Math.round(dencity), planetColors.length - 1);
			renderers.color = '#' + toHex(planetColors[index][0]) +
				toHex(planetColors[index][1]) +
				toHex(planetColors[index][2])
		}
	)
}
function toHex(num) {
	let out = num.toString(16)
	return out.length - 1 ? out : '0' + out
}
export { GravityColorEngine }
