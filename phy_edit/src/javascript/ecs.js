const ENTITY_INDEX_BITS = 22;
const ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1;

const ENTITY_GENERATION_BITS = 8;
const ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;
const MINIMUM_FREE_INDICES = 0;

function Entity(id) {
    this.id = id
}
Entity.prototype.index = function () { 
    return this.id & ENTITY_INDEX_MASK; 
}
Entity.prototype.generation = function () { 
    return (this.id >> ENTITY_INDEX_BITS) & ENTITY_GENERATION_MASK; 
}

function EntityManager() {
    this._generation = {};
    this._free_indices = [];
    this._entities = {};
}

EntityManager.prototype.create = function () {
    var idx = 0;
    if (this._free_indices.length > 0) {
        idx = this._free_indices.shift();
    } else {
        idx = Object.keys(this._generation).length;
        this._generation[idx] = 0;
    }
    var entity = this.make_entity(idx, this._generation[idx]);
    this._entities[idx] = entity
    console.log(entity.generation())
    console.log(entity.index())
    return entity
}

EntityManager.prototype.make_entity = function (idx, generation) {
    return new Entity(idx + (generation << ENTITY_INDEX_BITS))
}

EntityManager.prototype.alive = function (e) {
    return this._generation[e.index()] == e.generation();
}

EntityManager.prototype.destroy = function (e) {
    delete this._entities[e.id]
    ++this._generation[e.index()];
    this._free_indices.push(e.index())
}

console.log("debug")

manager = new EntityManager()
a = manager.create()
b = manager.create()
manager.destroy(a)
c = manager.create()
d = manager.create()
console.log(manager.alive(a))
console.log(manager.alive(b))
