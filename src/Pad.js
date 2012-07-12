var KEY = new function( ) {
    this.up = 38;
    this.down = 40;
    this.pressing = new Array();
}

function Pad( ) {
    this.x;
    this.y;
    this.speed;
    this.color;
    
    this.canvasWidth;
    this.canvasHeight;
    
    this.img = new Image( );
    
    this.lastKey;
    this.activateCaptureLastKey();
    
    this.cycleDuration = 30;
    this.setCoordinates( 10, 10 );
    this.setWidth( 25 );
    this.setHeight( 100 );
    this.setColor( 'green' );
    this.setSpeed( 5 );
}

Pad.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self.cycle( ) } , this.cycleDuration );
}

Pad.prototype.cycle = function() {
    this.move( );
}

Pad.prototype.setCoordinates = function( x, y ) {
    this.setX( x );
    this.setY( y );
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

Pad.prototype.setWidth = function( value ) {
    this.img.width = value;
}

Pad.prototype.setHeight = function( value ) {
    this.img.height = value;
}

Pad.prototype.setX = function( value ) {
    this.x = value;
}

Pad.prototype.setY = function( value ) {
    this.y = value;
}

Pad.prototype.setSpeed = function( value ) {
    this.speed = value;
}

Pad.prototype.setColor = function( value ) {
    this.color = value;
}

Pad.prototype.getWidth = function( ) {
    return this.img.width;
}

Pad.prototype.getHeight = function( ) {
    return this.img.height;
}

Pad.prototype.activateCaptureLastKey = function( ) {
   
    var self = this;
 
    document.addEventListener('keydown',function( evt ){
        self.lastKey = evt.keyCode;
        KEY.pressing[ evt.keyCode ] = true;
    }, false );
    
    document.addEventListener('keyup',function(evt){
        KEY.pressing[ evt.keyCode ] = false;
    }, false );
 
}

Pad.prototype.move = function( ) {
    
    switch( this.lastKey ) {
        case KEY.up:
            if( KEY.pressing[ KEY.up ] ) {
                var value = this.limiterMin( this.y - this.speed );
                this.setY( value );
            }
            break;
        case KEY.down:
            if( KEY.pressing[ KEY.down ] ) {
                var value = this.limiterMax( this.y + this.speed );
                this.setY( value );
            }
            break;
    }

}

Pad.prototype.limiterMin = function( value ) {
    if( value <= 0 ) {
        value = 0;
    } 
    return value;
}

Pad.prototype.limiterMax = function( value ) {
    var height = this.canvasHeight - this.getHeight( );
    
    if( value >= height ) {
        value = height;
    } 
    return value;
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
