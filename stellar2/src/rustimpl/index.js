import { ImageDataPloter } from "../../../lib/ecs/drawers/imageData";
import { Physics } from "../../../lib/ecs/physics/physics";
import { Transform } from "../../../lib/ecs/physics/transform";

export class MassRust {
	constructor(context, manager) {
		this.manager = manager
		this.context = context
		this.positionArray = new Float32Array([0, 0, 1])
		this.planetsArray = new Float32Array([]);
		this.imgData = new ImageDataPloter(context, manager)
		this.update()
	}
	update() {
		this.imgData.update()
		this.width = this.context.canvas.clientWidth
		this.height = this.context.canvas.clientHeight
		this.gravity = null
		import('../../../gravity_calc/pkg').then(({ Gravity }) => {
			this.gravity = Gravity.new(this.width, this.height)
		})
	}

	drawAll(position) {
		if (!this.gravity) return
		var gravity = this.gravity
		var all = this.manager.getEnities(Physics)
		var planetsDataLength = all.length * 3
		if (this.planetsArray.length !== planetsDataLength)
			this.planetsArray = new Float32Array(all.length * 3);
		var bufferIndex = 0;
		all.forEach((el) => {
			var transform = this.manager.get(Transform, el)[0]
			var physic = this.manager.get(Physics, el)[0]
			this.planetsArray[bufferIndex] = transform.positions[0]
			this.planetsArray[bufferIndex + 1] = transform.positions[1]
			this.planetsArray[bufferIndex + 2] = physic.mass
			bufferIndex += 3
		})
		this.positionArray[0] = position.x
		this.positionArray[1] = position.y
		this.positionArray[2] = position.scale
		this.imgData.pull()
		gravity.draw_planets(
			this.imgData.img.data,
			this.planetsArray,
			planetsDataLength,
			this.positionArray
		);
		this.context.putImageData(this.imgData.img, 0, 0);
	}
}