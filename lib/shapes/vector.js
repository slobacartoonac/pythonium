function ShapeVector(size_x, size_y){
	this[0]=size_x;
	this[1]=size_y;
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
}

ShapeVector.prototype = Array.prototype

export { ShapeVector }