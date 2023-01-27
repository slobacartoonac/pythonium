
import { EntityManager } from '../../lib/ecs'
import Touch from '../../lib/fe/touch'

import { PhysicsEngine, Physics } from '../../lib/ecs/physics/physics.js'
import { ShapeCircle } from '../../lib/shapes/circle.js'
import { PlasticBody, PlasticColisionEngine } from '../../lib/ecs/physics/plasticColisionEngine'
import { GravityEngine } from '../../lib/ecs/physics/gravityEngine'
import { GravityColorEngine } from './gravityColorEngine'

import { Transform } from '../../lib/ecs/physics/transform.js'

import Ploter from '../../lib/ecs/drawers/ploter.js'
import FPSPloter from '../../lib/ecs/drawers/drawFPS.js'
import GridPloter from '../../lib/ecs/drawers/drawGrid.js'
import { Renderer, RenderEngine } from '../../lib/ecs/drawers/render.js'
import MassPloter from '../../lib/ecs/drawers/drawMass.js'
import GalaxyPloter from '../../lib/ecs/drawers/drawGalaxy'
import GassPloter from '../../lib/ecs/drawers/drawGass.js'
import { ChainEngine } from '../../lib/ecs/physics/chainEngine.js'
import { skyColors } from './colors'
import { MassRust } from './rustimpl'


const canvas = document.getElementById('phy_canvas')
const toolokInput = document.getElementById('tolook_value')
const drawMass = document.getElementById('draw_mass')
const drawMassRust = document.getElementById('draw_mass_rust')
const drawGalaxy = document.getElementById('draw_galaxy')
const drawGass = document.getElementById('draw_gass')
const drawGrid = document.getElementById('draw_grid')
const drawFPS = document.getElementById('draw_fps')
const fullSpeed = document.getElementById('full_speed')
const drawPlanets = document.getElementById('draw_planets')
const maxPlanets = document.getElementById('max_planets')

var draw = new Ploter(canvas)

canvas.width = 640
canvas.height = 480

var position = { x: 0, y: 0, scale: 0.2 }

window.addEventListener('mousewheel', function (e) {
	position.scale *= e.wheelDelta > 0 ? 1.1 : 0.88
})

const fps = new FPSPloter(draw.context)
const grid = new GridPloter(draw.context)

var manager = new EntityManager()


const points = new RenderEngine(draw.context, manager)
const mass = new MassPloter(draw.context, manager)
const massRust = new MassRust(draw.context, manager)
const galaxy = new GalaxyPloter(draw.context, manager, skyColors)
const gass = new GassPloter(draw.context, manager)
const gravityEngine = new GravityEngine(manager)
const colisionEngine = new PlasticColisionEngine(manager)
const gravityColorEngine = new GravityColorEngine(manager)
const chainEngine = new ChainEngine(manager)
const physics = new PhysicsEngine(manager, [gravityEngine,
	colisionEngine,
	gravityColorEngine,
	chainEngine
])
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
	var massVolume = 0.2 + Math.tanh((radius - 50) * 0.2) * 0.05 + Math.tanh((20 - radius) * 0.2) * 0.1
	console.log(radius, massVolume)
	return Math.pow(radius, 3) * Math.PI * massVolume
}

function createSnode(positions, speeds, radius) {
	entity = manager.create()
	manager.asign(new Transform(positions), entity)
	manager.asign(new Physics(speeds, calculateMass(radius), 0), entity)
	manager.asign(new ShapeCircle(radius), entity)
	manager.asign(new Renderer('#aaffbb'), entity)
	manager.asign(new PlasticBody(), entity)
	return entity
}





all.push(createSnode([0, 0], [0, 0], 55, all, 'Sun'))


all.push(createSnode([255, 0], [0, 5], 3, all, 'Mercury'))
all.push(createSnode([300, 0], [0, 5], 4, all, 'Venus'))
all.push(createSnode([450, 0], [0, 4], 7, all, 'Earth'))
all.push(createSnode([600, 0], [0, 4], 4, all, 'Mars'))
let yupiter = createSnode([1400, 0], [0, 2.5], 35, all, 'Jupiter')
all.push(yupiter)
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
		[(10 * Math.sin(tan) + Math.random() * 14 - 7), (10 * Math.cos(tan) + Math.random() * 14 - 7)],
		size || (0.1 + Math.random()), all)
	all.push(el)
}



setInterval(() => {
	let max = parseInt(maxPlanets.value) || 100
	if (all.length < max - 10) {
		for (let i = 0; i < 10; i++) generateItem(1)
	}
	all.forEach((el, index) => (index > max) &&
		manager.destroy(el)
	)
}, 50)





function work() {
	var numb = parseInt(toolokInput.value) - 1
	if (!isNaN(numb) && numb >= 0) {
		var toLookEntity = all[numb % all.length]
		var toLookTransform = manager.get(Transform, toLookEntity)[0]
		position.x = toLookTransform.positions[0]
		position.y = toLookTransform.positions[1]
	}
	draw.clear()

	if (drawGrid.checked)
		grid.draw(100, 100, position)
	if (drawMass.checked)
		mass.draw(position)
	if (drawMassRust.checked)
		massRust.drawAll(position)
	if (drawGass.checked)
		gass.draw(position)
	if (drawGalaxy.checked) {
		galaxy.draw(position)
	}
	if (drawPlanets.checked)
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
	setTimeout(work, fullSpeed.checked ? 0 : 15)
}
work()