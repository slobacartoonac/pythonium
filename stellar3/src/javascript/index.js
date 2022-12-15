import { Gravity } from "gravity_calc";
import Touch from '../../../lib/fe/touch.js'
import { EntityManager } from '../../../lib/ecs'

import { PhysicsEngine, Physics } from '../../../lib/ecs/physics/physics.js'
import { ShapeCircle } from '../../../lib/shapes/circle.js'
import { PlasticColisionEngine } from '../../../lib/ecs/physics/plasticColisionEngine'
import { GravityEngine } from '../../../lib/ecs/physics/gravityEngine'
import { GravityColorEngine } from '../../../lib/ecs/drawers/gravityColorEngine.js'

import { Transform } from '../../../lib/ecs/physics/transform.js'

import Ploter from '../../../lib/ecs/drawers/ploter.js'
import FPSPloter from '../../../lib/ecs/drawers/drawFPS.js'
import GridPloter from '../../../lib/ecs/drawers/drawGrid.js'
import { Renderer, RenderEngine } from '../../../lib/ecs/drawers/render.js'

const canvas = document.getElementById('phy_canvas')
const toolokInput = document.getElementById('tolook_value')
const drawMass = document.getElementById('draw_mass')
const drawGrid = document.getElementById('draw_grid')
const drawFPS = document.getElementById('draw_fps')
const fullSpeed = document.getElementById('full_speed')
var draw = new Ploter(canvas)
var position = { x: 0, y: 0, scale: 0.2 }
let width = canvas.width = 640;
let height = canvas.height = 480;
let gravity = Gravity.new(width, height);
let img = draw.context.createImageData(width, height)

const fps = new FPSPloter(draw.context)
const grid = new GridPloter(draw.context)

var manager = new EntityManager()
const points = new RenderEngine(draw.context, manager)
const gravityEngine = new GravityEngine(manager)
const colisionEngine = new PlasticColisionEngine(manager)
const gravityColorEngine = new GravityColorEngine(manager)
const physics = new PhysicsEngine(manager, [gravityEngine, colisionEngine, gravityColorEngine])



var positionArray = new Float32Array([position.x, position.y, position.scale])
window.addEventListener('mousewheel', function (e) {
	position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88
})
var touch = new Touch(canvas, 100)
touch.sub('force', ({ delta, deltaZoom }) => {
	position = {
		...position, scale: position.scale * deltaZoom, x: position.x - delta.x / position.scale,
		y: position.y - delta.y / position.scale
	}
})

var entity = null

var all = []

function calculateMass(radius) {
	var massVolume = 0.1
	return Math.pow(radius, 3) * Math.PI * massVolume
}

function createSnode(positions, speeds, radius) {
	entity = manager.create()
	manager.asign(new Transform(positions), entity)
	manager.asign(new Physics(speeds, calculateMass(radius), 0), entity)
	manager.asign(new ShapeCircle(radius), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	return entity
}

all.push(createSnode([0, 0], [0, 0], 65, all, 'Sun'))
all.push(createSnode([255, 0], [0, 5], 3, all, 'Mercury'))
all.push(createSnode([300, 0], [0, 5], 4, all, 'Venus'))
all.push(createSnode([450, 0], [0, 4], 7, all, 'Earth'))
all.push(createSnode([600, 0], [0, 4], 4, all, 'Mars'))
all.push(createSnode([1400, 0], [0, 2.5], 25, all, 'Jupiter'))
all.push(createSnode([1440, 0], [0, 6], 2, all, 'Europa'))
all.push(createSnode([1450, 0], [0, 6], 2, all, 'Europa'))
all.push(createSnode([2800, 0], [0, 2.5], 5, all, 'Saturn'))
const generateItem = (size) => {
	var angle = Math.random() * 2 * Math.PI
	var radius = 200 + Math.random() * 2000
	var x = Math.sin(angle) * radius
	var y = Math.cos(angle) * radius
	var tan = Math.atan2(x, y) - Math.PI / 2

	var el = createSnode(
		[x, y],
		[(10 * Math.sin(tan) + Math.random() * 14 - 7),
		(10 * Math.cos(tan) + Math.random() * 14 - 7)],
		size || (0.1 + Math.random()), all)
	all.push(el)
}

setInterval(() => {
	all.length < 30 && generateItem()
}, 200)

var planetsArray = new Float32Array(all.length * 3);

const drawGravity2 = () => {
	var planetsDataLength = all.length * 3
	if (planetsArray.length !== planetsDataLength)
		planetsArray = new Float32Array(all.length * 3);
	var bufferIndex = 0;
	all.forEach((el) => {
		var transform = manager.get(Transform, el)[0]
		var physic = manager.get(Physics, el)[0]
		planetsArray[bufferIndex] = transform.positions[0]
		planetsArray[bufferIndex + 1] = transform.positions[1]
		planetsArray[bufferIndex + 2] = physic.mass
		bufferIndex += 3
	})
	positionArray[0] = position.x
	positionArray[1] = position.y
	positionArray[2] = position.scale
	gravity.draw_planets(
		img.data,
		planetsArray,
		planetsDataLength,
		positionArray
	);
	draw.context.putImageData(img, 0, 0);
}
var i = 0;

function work() {
	var numb = parseInt(toolokInput.value)
	if (!isNaN(numb)) {
		var toLookEntity = all[numb % all.length]
		var toLookTransform = manager.get(Transform, toLookEntity)[0]
		position.x = toLookTransform.positions[0]
		position.y = toLookTransform.positions[1]
	}
	draw.clear()
	if (drawMass.checked)
		drawGravity2()
	if (drawGrid.checked)
		grid.draw(100, 100, position)
	points.draw(position)
	if (drawFPS.checked)
		fps.draw()
	physics.compute()

	all = all.filter(function (e, index) {
		var alive = manager.alive(e)
		if (!alive && !isNaN(numb) && numb >= index) {
			toolokInput.value = numb - 1
		}
		return alive
	})
	if (numb >= all.length) {
		toolokInput.value = all.length - 1
	}
	requestAnimationFrame(work)
}
requestAnimationFrame(work)