function Layer( ) {
    this.width;
    this.offSet;
    this.img = new Image( );
    this.x;
}

Layer.prototype.setPathImg = function( value ) {
    this.img.src = value;
}

Layer.prototype.setWidth = function( value ) {
    this.img.width = value;
}

Layer.prototype.calculeOffSet = function( value ) {
    this.offSet =  this.img.width - value;    
}

Layer.prototype.getOffSet = function( ) {
    return this.offSet;
}

Layer.prototype.compute = function( proportion ) {
    this.x = proportion * this.offSet;
}

Layer.prototype.getX = function( ) {
    return this.x;
}

Layer.prototype.paint = function ( ctx ) {
    var x = - this.x;
    var y = 0;
           
    ctx.drawImage( this.img, x, y );
    ctx.drawImage( this.img, x, y );
}