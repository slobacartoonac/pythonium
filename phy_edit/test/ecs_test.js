var assert = require('assert')
import { EntityManager } from '../src/javascript/ecs'

describe('EntityManager', function() {
	it('should create entity manager', function() {
		var manager = new EntityManager()
		assert.ok(manager)
		var a = manager.create()
		var b = manager.create()
		manager.destroy(a)
		manager.create()
		manager.create()
		console.log(manager.alive(a))
		console.log(manager.alive(b))
		
	})
	it('should create entity', function() {
		var manager = new EntityManager()
		var a = manager.create()
		assert.equal(a.generation(),0)
		assert.equal(a.index(),0)
		var b = manager.create()
		assert.equal(b.generation(),0)
		assert.equal(b.index(),1)
	})
	it('should create entity, delete entity, overide entity', function() {
		var manager = new EntityManager()
		var a = manager.create()
		assert.equal(a.generation(),0)
		assert.equal(a.index(),0)
		var b = manager.create()
		assert.equal(b.generation(),0)
		assert.equal(b.index(),1)
		manager.destroy(a)
		assert.ok(!manager.alive(a))
		assert.ok(manager.alive(b))
		var c = manager.create()
		assert.equal(c.generation(),1)
		assert.equal(c.index(),0)
		assert.ok(!manager.alive(a))
	})

	it('it should add component, find component, run function, remove component', function() {
		function Component(a){
			this.a = a
		}
		Component.prototype.f = function(){ this.a ++}
		var manager = new EntityManager()
		var entity = manager.create()
		assert.equal(entity.generation(),0)
		assert.equal(entity.index(),0)
		var component = new Component(5)
		manager.asign(component, entity)
		var component_array = manager.get(Component, entity)
		assert.equal(component_array.length, 1)
		assert.equal(component_array[0].a, 5)
		component_array.forEach(element => {
			element.f()
		})
		assert.equal(component_array[0].a, 6)
		manager.remove(component, entity)
		assert.equal(manager.get(Component, entity).length, 0)
	})
})

