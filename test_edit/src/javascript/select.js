// written by Slobodan Zivkovic slobacartoonac@gmail.com

function Select() {
    this.selection=[]
}

Select.prototype.findGeoMean = function() {
    var prodX = 1;
    var prodY = 1;
    var len = this.selection.length;
    this.selection.forEach(point => {
        prodX *= point[0];
        prodY *= point[1];
    })
    var  geomeanX = Math.pow(prodX, 1.0 / len);
    var  geomeanY = Math.pow(prodY, 1.0 / len);
    return [geomeanX, geomeanY]
}

Select.prototype.orderValue = function(geomean, point){
    return Math.atan2( geomean[1]-point[1], geomean[0] - point[0])
}

Select.prototype.sort = function() {
    var geomean = this.findGeoMean();
    // make array of elements with order values
    var tempArray = this.selection.map(point => [this.orderValue(geomean, point), point])
    tempArray.sort(a, b => a[0] - b[0])
    //extract ordered original array elements
    this.selection = tempArray.map(el => el[1])
}

Select.prototype.pointSelect = function(point, pointSpace, precision) {
    var precisionSq = precision * precision;
    var selectedPoints = pointSpace.filter(testPoint => {
        var difX = testPoint[0] - point[0];
        var difY = testPoint[1] - point[1];
        var difSq = difX * difX + difY * difY; // square diffrence
        return difSq < precisionSq //squares are compared to avoid sqrt
    })
    if(!selectedPoints.length){
        this.selection = [] //selected empty space, deselect evrything
        return this.selection
    }
    this.selection.concat(selectedPoints)
    this.sort();    
}

export default Select