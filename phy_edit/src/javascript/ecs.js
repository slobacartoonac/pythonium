const ENTITY_INDEX_BITS = 22
const ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1

const ENTITY_GENERATION_BITS = 8
const ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1
const MINIMUM_FREE_INDICES = 0

function Entity(id) {
	this.id = id
}
Entity.prototype.index = function () { 
	return this.id & ENTITY_INDEX_MASK
}
Entity.prototype.generation = function () { 
	return (this.id >> ENTITY_INDEX_BITS) & ENTITY_GENERATION_MASK
}

function EntityManager() {
	this._generation = {}
	this._free_indices = []
	this._entities = {}
	this._components = {}
}

EntityManager.prototype.create = function () {
	var idx = 0
	if (this._free_indices.length > MINIMUM_FREE_INDICES) {
		idx = this._free_indices.shift()
	} else {
		idx = Object.keys(this._generation).length
		this._generation[idx] = 0
	}
	var entity = this.make_entity(idx, this._generation[idx])
	this._entities[idx] = entity
	return entity
}

EntityManager.prototype.make_entity = function (idx, generation) {
	return new Entity(idx + (generation << ENTITY_INDEX_BITS))
}

EntityManager.prototype.alive = function (e) {
	return this._generation[e.index()] == e.generation()
}

EntityManager.prototype.destroy = function (e) {
	delete this._entities[e.id]
	++this._generation[e.index()]
	this._free_indices.push(e.index())
}

EntityManager.prototype.asign = function(component, e){
	var entity_components = this._components[e.id]
	if(!entity_components){
		this._components[e.id] = [component]
		return
	}
	if(entity_components.find(comp=>component===comp))
		throw Error('Component is allready asiged')
	entity_components.push(component)
}

EntityManager.prototype.get = function(c_type, e){
	var entity_components = this._components[e.id]
	if(!entity_components){
		return []
	}
	return entity_components.filter(function(component){
		return component instanceof c_type
	})
}

EntityManager.prototype.remove = function(component, e){
	var entity_components = this._components[e.id]
	if(!entity_components){
		return
	}
	this._components[e.id] = entity_components.filter(function(compon){
		return compon !== component
	})
}

EntityManager.prototype.getEnities = function(c_type){
	return Object.values(this._entities).filter(
		(entity)=>{
			return this.get(c_type, entity).length
		}
	)
}

EntityManager.prototype.compose = function(e){
	var entity_components = this._components[e.id]
	if(!entity_components){
		return {}
	}
	var ret = {}
	entity_components.forEach(element => {
		Object.keys(element).forEach(key => {
			if(ret[key]){
				if(ret[key+'_list'])
				{
					ret[key+'_list'].push(element[key])
					return
				}
				ret[key+'_list'] = [ret[key], element[key]]
				return
			}
			ret[key] = element[key]
		})
	})
	return ret
}

export { Entity,
	EntityManager }
