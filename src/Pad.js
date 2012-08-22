var KEY = new function( ) {
    this.up = 38;
    this.down = 40;
}

function Pad( ) {
    this.x = undefined;
    this.y = undefined;
    this.speed = undefined;
    this.color = undefined;
    this.cycleDuration = undefined;
    this.lastKey = undefined;
    this.canvasWidth = undefined;
    this.canvasHeight = undefined;
    
    this.commands = {};
    
    this.img = new Image( );
    
    this._setDefaultValues( );
    this._activateCaptureLastKey( );
}

Pad.prototype._setDefaultValues = function( ) {
    this._setCycleDuration( 30 );
    this.setCoordinates( 10, 10 );
    this.setSize( 25, 100 );
    this.setColor( 'green' );
    this.setSpeed( 5 );
    
    this._definedCommands( );
}

Pad.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self._cycle( ) } , this.cycleDuration );
}

Pad.prototype.paint = function( ctx ) {
    var x = this.x;
    var y = this.y;
    
    if( this.img.src != '' ) {
        ctx.drawImage( this.img, x, y );
    } else {
        var height = this.getHeight( );
        var width = this.getWidth( );
    
        ctx.fillStyle = this.color;
        ctx.fillRect( x, y, width, height );
    }
}

Pad.prototype.setSize = function( width, height ) {
    this._setWidth( width );
    this._setHeight( height );
}

Pad.prototype.setSpeed = function( value ) {
    this.speed = value;
}

Pad.prototype.setColor = function( value ) {
    this.color = value;
}

Pad.prototype._definedCommands = function( ) {
    var self = this;
    this.commands[KEY.up] = function() { self._moveUp(); };
    this.commands[KEY.down] = function() { self._moveDown(); };
}

Pad.prototype.setCoordinates = function( x, y ) {
    this._setX( x );
    this._setY( y );
}

Pad.prototype.setCanvasWidth = function( value ) {
    this.canvasWidth = value;
}

Pad.prototype.setCanvasHeight = function( value ) {
    this.canvasHeight = value;
}

Pad.prototype.setPathImg = function( value ) {
    this.img.src = value;
}

Pad.prototype.getX = function( ) {
    return this.x;
}

Pad.prototype.getY = function( ) {
    return this.y;
}

Pad.prototype.getWidth = function( ) {
    return this.img.width;
}

Pad.prototype.getHeight = function( ) {
    return this.img.height;
}

Pad.prototype.getSpeed = function( ) {
    return this.speed;
}

Pad.prototype._activateCaptureLastKey = function( ) {
   
    var self = this;
 
    document.addEventListener('keydown',function( evt ){
        self.lastKey = evt.keyCode;
    }, false );
    
    document.addEventListener('keyup',function(evt){
        self.lastKey = undefined;
    }, false );
 
}

Pad.prototype._move = function( ) {
    if(!this.commands[this.lastKey] )return;
    
    this.commands[this.lastKey].call();
}

Pad.prototype._moveUp = function ( ) {
    var value = this._limiterMin( this.y - this.speed );
    this._setY( value );
}

Pad.prototype._moveDown = function ( ) {
    var value = this._limiterMax( this.y + this.speed );
    this._setY( value );
}

Pad.prototype._limiterMin = function( value ) {
    if( value <= 0 ) {
        value = 0;
    } 
    return value;
}

Pad.prototype._limiterMax = function( value ) {
    var height = this.canvasHeight - this.getHeight( );
    
    if( value >= height ) {
        value = height;
    } 
    return value;
}

Pad.prototype._cycle = function() {
    this._move( );
}

Pad.prototype._setWidth = function( value ) {
    this.img.width = value;
}

Pad.prototype._setHeight = function( value ) {
    this.img.height = value;
}

Pad.prototype._setCycleDuration = function( value ) {
    this.cycleDuration = value;
}

Pad.prototype._setX = function( value ) {
    this.x = value;
}

Pad.prototype._setY = function( value ) {
    this.y = value;
}