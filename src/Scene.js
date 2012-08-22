function Scene(canvasID) {
    this.color = undefined;
    this.indexBall = undefined;
    this.indexPad = undefined;
    this.cycleDuration = undefined;
    this.canvas = undefined;
    this.isCrashing = undefined;
    
    this.layerStack = new Array( );
    this.objectStack = new Array( );
    
    this._prepareCanvas( canvasID );
    
    this._setDefaultValues( );
}

Scene.prototype._setDefaultValues = function( ) {
    this.cycleDuration = 30;
    this.isCrashing = false;
    this.setColor( 'black' );
}

Scene.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self._cycle( ) } , this.cycleDuration );
}

Scene.prototype.addLayer = function(layer) {
    layer.calculeOffSreen( this._width( ) );
    this.layerStack.push( layer );
}

Scene.prototype.addObject = function(object) {
    object.setCanvasWidth( this._width( ) );
    object.setCanvasHeight( this._height( ) );
    this.objectStack.push( object );
}

Scene.prototype.addBall = function(ball) {
    this.addObject( ball );
    this.indexBall = this._objects( );
}

Scene.prototype.addPad = function(pad) {
    this.addObject( pad );
    this.indexPad = this._objects( );
}

Scene.prototype.setSize = function( width, height ) {
    this._setWidth( width );
    this._setHeight( height );
}

Scene.prototype.setColor = function( value ) {
    this.color = value;
}

Scene.prototype._cycle = function() {
  this._drawToCanvas( );
  this._isBallColisionToPad( );
}

Scene.prototype._isBallColisionToPad = function( ) {
    if( this._getIndexBall( ) == undefined ) return;
    if( this._getIndexPad( ) == undefined ) return;
    
    var aBall = this._getBall( );
    var aBallMaxX = aBall.getX( ) + aBall.getWidth( );
    var aBallMaxY = aBall.getY( ) + aBall.getHeight( );
    
    var aPad = this._getPad( );
    var aPadMaxX = aPad.getX( ) + aPad.getWidth( );
    var aPadMaxY = aPad.getY( ) + aPad.getHeight( );
    
    var isCrash = false;
    
    if( aBallMaxX >= aPad.getX( ) &&
        aBallMaxY >= aPad.getY( ) &&
        aBall.getX( ) <= aPadMaxX &&
        aBall.getY( ) <= aPadMaxY ) {
        
        isCrash = true;
        
        if( !this.isCrashing ) {
            
            this.isCrashing = true;
            
            var dx;
            var dy;
            
            if( aBall.getX( ) <= aPad.getX( ) &&
                aBall.getY( ) <= aPad.getY( ) ) {
                
                dx = aBallMaxX - aPad.getX( );
                dy = aBallMaxY - aPad.getY( );
            } else if( aBall.getX( ) <= aPad.getX( ) &&
                       aBall.getY( ) >= aPad.getY( ) ) {
                dx = aBallMaxX - aPad.getX( );
                dy = aPadMaxY - aBall.getY( );    
            }
            else if( aBallMaxY <= aPadMaxY &&
                     aBall.getX( ) >= aPad.getX( ) ) {
                dy = aBallMaxY - aPad.getY( );
                dx = aPadMaxX - aBall.getX( );
            } else {
                dx = aPadMaxX - aBall.getX( );
                dy = aPadMaxY - aBall.getY( );
            }
            
            if( dx == dy ) {
                aBall.setDirection( 180 + aBall.direction );
            } else if( dx < dy ) {
                aBall.differenceLoopToDirection( );
            } else {
                aBall.differenceLoopAndHalfToDirection( );
            }
            
        }
        
    } else {
        this.isCrashing = false;
    }
    
    return isCrash;
}

Scene.prototype.ballToTransfer = function() {
    var aBall = this._getBall( );
    var aBallMaxX = aBall.getX( ) + aBall.getWidth( );
    var aBallMaxY = aBall.getY( ) + aBall.getHeight( );
    
    var aPad = this._getPad( );
    var aPadMaxX = aPad.getX( ) + aPad.getWidth( );
    var aPadMaxY = aPad.getY( ) + aPad.getHeight( );
    
    var top, down, left, rigth;
    
    top = aBallMaxY - aPad.getY( );
    left = aBallMaxX - aPad.getX( );
    down = aPadMaxY - aBall.getY( );
    rigth = aPadMaxX - aBall.getX( );
    
    top = Math.abs( top );
    left = Math.abs( left );
    down = Math.abs( down );
    rigth = Math.abs( rigth );
}

Scene.prototype._drawToCanvas = function() {
    var ctx = this.canvas.getContext('2d');
    
    this._background( ctx );
    this._drawLayers( ctx );
    this._drawObjects( ctx );
}

Scene.prototype._drawLayers = function( ctx ) {
    var size = this._layers( );
    for( var i = 1; i <= size; i++ ) {
        var theLayer = this._getLayer( i );
        theLayer.compute( this._calculeProportionX( ) );
        theLayer.paint( ctx );
    }
}

Scene.prototype._drawObjects = function( ctx ) {
    var size = this._objects( );
    for( var i = 1; i <= size; i++ ) {
        var theObject = this._getObject( i );
        theObject.paint( ctx );
    }
}

Scene.prototype._background = function( ctx ) {
    ctx.fillStyle = this.color;
    ctx.fillRect( 0, 0, this._width(), this._height() );
}

Scene.prototype._prepareCanvas = function( canvasID ) {
    this.canvas = document.getElementById( canvasID );
    this._checkExists();
    this._checkCanvas();
}

Scene.prototype._checkExists = function() {
    if (!this.canvas) {
        throw ("element does not exists");
    }
}

Scene.prototype._checkCanvas = function() {
    if (this.canvas.tagName != "CANVAS") {
        throw ("element not canvas");
    }
}

Scene.prototype._width = function() {
   return this.canvas.width;
}

Scene.prototype._height = function() {
    return this.canvas.height;
}

Scene.prototype._getLayer = function(ordinal) {
    var index = ordinal - 1;
    return this.layerStack[ index ];
}

Scene.prototype._layers = function() {
    return this.layerStack.length;
}

Scene.prototype._getObject = function(ordinal) {
    var index = ordinal - 1;
    return this.objectStack[ index ];
}

Scene.prototype._objects = function() {
    return this.objectStack.length;
}

Scene.prototype._getIndexBall = function( ) {
    return this.indexBall;
}

Scene.prototype._getIndexPad = function( ) {
    return this.indexPad;
}

Scene.prototype._getBall = function( ) {
    var index = this._getIndexBall( );
    return this._getObject( index );
}

Scene.prototype._getPad = function( ) {
    var index = this._getIndexPad( );
    return this._getObject( index );
}

Scene.prototype._calculeProportionX = function() {
    if( this._getIndexBall( ) == undefined ) return;
    var ball = this._getBall( );
    return ( ball.getX( ) / this._width( ) );
}

Scene.prototype._setWidth = function( value ) {
    this.canvas.width = value;
}

Scene.prototype._setHeight = function( value ) {
    this.canvas.height = value;
}
