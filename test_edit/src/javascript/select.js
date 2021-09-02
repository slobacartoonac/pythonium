// written by Slobodan Zivkovic slobacartoonac@gmail.com

function Select() {
    this.selection = []
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

Select.prototype.orderValue = function(geomean, point, shiftAngle){
    shiftAngle = shiftAngle ? shiftAngle : 0
    var tempAngle = Math.atan2( geomean[1]-point[1], geomean[0] - point[0]) - shiftAngle
    // shift range to [0, 2PI) making start point first
    if(tempAngle < 0){
        tempAngle += Math.PI * 2
    }
    return tempAngle
}

Select.prototype.sort = function() {
    var geomean = this.findGeoMean();
    var shiftAngle = Math.atan2( geomean[1]-this.selection[0][1], geomean[0] - this.selection[0][0])
    // make array of elements with order values
    var tempArray = this.selection.map(point => [this.orderValue(geomean, point, shiftAngle), point])
    tempArray.sort((a, b) => a[0] - b[0])
    //extract ordered original array elements
    this.selection = tempArray.map(el => el[1])
}

Select.prototype.proccesSelection = function(selectedPoints){
    if(!selectedPoints.length){
        this.selection = [] //selected empty space, deselect evrything
        return this.selection
    }
    this.selection = [...new Set(this.selection.concat(selectedPoints))] // remove duplicates
    this.sort();
    return this.selection
}

Select.prototype.pointSelect = function(point, pointSpace, precision) {
    var precisionSq = precision * precision;
    var selectedPoints = pointSpace.filter(testPoint => {
        var difX = testPoint[0] - point[0];
        var difY = testPoint[1] - point[1];
        var difSq = difX * difX + difY * difY; // square diffrence
        return difSq < precisionSq //squares are compared to avoid sqrt
    })
    return this.proccesSelection(selectedPoints)
}

Select.prototype.areaSelect = function(pointStart, pointEnd, pointSpace){
    var selectedPoints = pointSpace.filter(testPoint => {
        return (
                testPoint[0] > pointStart[0] &&
                testPoint[1] > pointStart[1] &&
                testPoint[0] < pointEnd[0] &&
                testPoint[1] < pointEnd[1]
                )
    })
    return this.proccesSelection(selectedPoints)
}

export default Select