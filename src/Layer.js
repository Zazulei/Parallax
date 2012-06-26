function Layer( ) {
    this.width;
    this.offSet;
}

Layer.prototype.setWidth = function( value ) {
    this.width = value;
}

Layer.prototype.calculeOffSet = function( value ) {
    this.offSet =  this.width - value;
}

Layer.prototype.getOffSet = function( ) {
    return this.offSet;
}

Layer.prototype.compute = function( ) {
    //return this.offSet;
}