var assert = require('assert')
import { PointInTriangle, LineCollision } from '../math/vec'
import {ShapeVector} from '../shapes/vector'

describe('Shape vector', function() {
	var v1 = new ShapeVector(2,1)
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
		var v2 = new ShapeVector(2,1)
		v2.x = 4
		assert.equal(v2[0], 4)
	})

	it('[1] should be 4', function() {
		var v3 = new ShapeVector(2,1)
		v3.y = 4
		assert.equal(v3[1], 4)
	})
})

describe('Point in triangle', function() {
	var v1 = {x: 0, y: 0}
	var v2 = {x: 0.5, y: 1}
	var v3 = {x: 1, y: 0}
	it('point shoud be in triangle', function() {
		var pont = {x: 0.5, y: 0.5}
		assert.ok(PointInTriangle(pont, v1, v2, v3))
	})
	it('point shoud be out triangle', function() {
		var pont = {x: 0, y: 0.5}
		assert.ok(!PointInTriangle(pont, v1, v2, v3))

	})
})

describe('LineCollision', function() {
	var A1 = {x: 0, y: 0}
	var A2 = {x: 1, y: 1}
	it('Line should colide', function() {
		var B1 = {x: 0, y: 1}
		var B2 = {x: 1, y: 0}
		assert.ok(LineCollision(A1, A2, B1, B2))
	})
	it('Line should not colide', function() {
		var B1 = {x: 0, y: 1}
		var B2 = {x: 1, y: 2}
		assert.ok(!LineCollision(A1, A2, B1, B2))
	})
})

