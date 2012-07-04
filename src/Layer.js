function Layer( ) {
    this.offSetY = 0;
    this.offSreen;
    this.img = new Image( );
    this.x;
}

Layer.prototype.setPathImg = function( value ) {
    this.img.src = value;
}

Layer.prototype.setWidth = function( value ) {
    this.img.width = value;
}

Layer.prototype.calculeOffSreen = function( value ) {
    this.offSreen =  this.img.width - value;
}

Layer.prototype.getOffSreen = function( ) {
    return this.offSreen;
}

Layer.prototype.compute = function( proportion ) {
    this.x = proportion * this.offSreen;
}

Layer.prototype.setOffSetY = function( value ) {
    this.offSetY = value;
}

Layer.prototype.paint = function ( ctx ) {
    var x = - this.x;
    var y = this.offSetY;
           
    ctx.drawImage( this.img, x, y );
    ctx.drawImage( this.img, x, y );
}