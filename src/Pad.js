var KEY = new function( ) {
    this.up = 38;
    this.down = 40;
    this.pressing = new Array();
}

function Pad( ) {
    this.cycleDuration = 30;

    this.x;
    this.y;
    this.speed;
    
    this.img = new Image( );
    
    this.lastKey;
    this.activateCaptureLastKey();
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
            if( KEY.pressing[ KEY.up ] )
                this.setY( this.y - this.speed );
            break;
        case KEY.down:
            if( KEY.pressing[ KEY.down ] )
                this.setY( this.y + this.speed );
            break;
    }

}

Pad.prototype.paint = function( ctx ) {
    var x = this.x;
    var y = this.y;
           
    ctx.drawImage( this.img, x, y );
}
