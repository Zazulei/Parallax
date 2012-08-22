function Layer( ) {
    this.offSetY = undefined;
    this.offSreen = undefined;
    this.x = undefined;
    
    this.img = new Image( );
    
    this._setDefaultValues( );
}

Layer.prototype._setDefaultValues = function( ) {
    this.setOffSetY( 0 );
}

Layer.prototype.setPathImg = function( value ) {
    this.img.src = value;
}

Layer.prototype.calculeOffSreen = function( value ) {
    this.offSreen =  this.img.width - value;
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
}

Layer.prototype._setWidth = function( value ) {
    this.img.width = value;
}

Layer.prototype._getOffSreen = function( ) {
    return this.offSreen;
}