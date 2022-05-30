function Vector(...array){
	if(array.length == 1) {
		Object.assign(this,Object.values(array[0]))
	} else {
		Object.assign(this, array)
	}
	
	Object.defineProperty(this, 'x', {
		get() {

			return this[0];
		},
		set(value) {
			this[0] = value;
		}
	});
	Object.defineProperty(this, 'y', {
		get() {
			return this[1];
		},
		set(value) {
			this[1] = value;
		}
	});
	Object.defineProperty(this, 'z', {
		get() {
			return this[2];
		},
		set(value) {
			this[2] = value;
		}
	});
}

Vector.prototype = Array.prototype

export { Vector }