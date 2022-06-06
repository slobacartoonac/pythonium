var assert = require('assert')
import { pointInTriangle, lineCollision } from '../math/vec'
import { Vector } from '../shapes/vector'
import { circleDistance } from '../math/circle'

describe('Shape vector', function() {
	var v1 = new Vector(2,1)
	it('x should be 2', function() {
		assert.equal(v1.x, 2)
	})
	it('y should be 1', function() {
		assert.equal(v1.y, 1)
	})
	it('[0] should be 2', function() {
		assert.equal(v1[0], 2)
	})
	it('[1] should be 1', function() {
		assert.equal(v1[1], 1)
	})

	it('[0] should be 4', function() {
		var v2 = new Vector(2,1)
		v2.x = 4
		assert.equal(v2[0], 4)
	})

	it('[1] should be 4', function() {
		var v3 = new Vector(2,1)
		v3.y = 4
		assert.equal(v3[1], 4)
	})

	it('shape vector from object {x: 1, y: 2}', function() {
		var v4 = new Vector({x: 1, y: 2})
		assert.equal(v4[0], 1)
		assert.equal(v4[1], 2)
	})

	it('shape vector from object [3, 4]', function() {
		var v5 = new Vector([3, 4])
		assert.equal(v5.x, 3)
		assert.equal(v5.y, 4)
	})

	it('shape vector from object shape', function() {
		var v6 = new Vector(new Vector([3, 4]))
		assert.equal(v6.x, 3)
		assert.equal(v6.y, 4)
	})
})

describe('Point in triangle', function() {
	var v1 = {x: 0, y: 0}
	var v2 = {x: 0.5, y: 1}
	var v3 = {x: 1, y: 0}
	it('point shoud be in triangle', function() {
		var pont = {x: 0.5, y: 0.5}
		assert.ok(pointInTriangle(pont, v1, v2, v3))
	})
	it('point shoud be out triangle', function() {
		var pont = {x: 0, y: 0.5}
		assert.ok(!pointInTriangle(pont, v1, v2, v3))

	})
})

describe('lineCollision', function() {
	var A1 = {x: 0, y: 0}
	var A2 = {x: 1, y: 1}
	it('Line should colide', function() {
		var B1 = new Vector(0, 1)
		var B2 = {x: 1, y: 0}
		assert.ok(lineCollision(A1, A2, B1, B2))
	})
	it('Line should not colide', function() {
		var B1 = {x: 0, y: 1}
		var B2 = {x: 1, y: 2}
		assert.ok(!lineCollision(A1, A2, B1, B2))
	})
})

describe('circleDistance', function() {
	var A1 = {x: 0, y: 0}
	var A2 = {x: 1, y: 1}
	it('Circle should colide', function() {
		assert.ok(circleDistance(new Vector(0, 0), 1, new Vector(0, 1), 1) < 0)
		assert.ok(circleDistance(new Vector(1, 0), 1, new Vector(0, 0), 1) < 0)
	})
	it('Circle should not colide', function() {
		assert.ok(circleDistance(new Vector(3, 0), 1, new Vector(0, 0), 1) > 0)
		assert.ok(circleDistance(new Vector(0, 3), 1, new Vector(0, 0), 1) > 0)
	})
})



