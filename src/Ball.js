function Ball( ) {
    this.LOOP_DIRECTION = 360;
    this.HALF_LOOP_DIRECTION = this.LOOP_DIRECTION / 2;
    
    this.x = undefined;
    this.y = undefined;
    this.speed = undefined;
    this.color = undefined;
    this.direction = undefined;
    this.canvasHeight = undefined;
    this.canvasWidth = undefined;
    this.cycleDuration = undefined;
    
    this.img = new Image( );

    this._randomDirection( );
    this._setDefaultValues( );
}

Ball.prototype._setDefaultValues = function( ) {
    this.setSpeed( 5 );
    this.setCoordinates( 0, 0 );
    this.setColor( 'black' );
    this.setSize( 15, 15 );
    this._setCycleDuration( 30 );
}

Ball.prototype.setSize = function( width, height ) {
    this._setWidth( width );
    this._setHeight( height );
}

Ball.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self._cycle( ) } , this.cycleDuration );
}

Ball.prototype.setCanvasWidth = function( value ) {
    this.canvasWidth = value;
}

Ball.prototype.setCanvasHeight = function( value ) {
    this.canvasHeight = value;
}

Ball.prototype.setColor = function( value ) {
    this.color = value;
}

Ball.prototype.setDirection = function( value ) {
    this.direction = Math.abs( value ) % 360;
}

Ball.prototype.setSpeed = function( value ) {
    this.speed = value;
}

Ball.prototype.setPathImg = function( value ) {
    this.img.src = value;
}

Ball.prototype.setCoordinates = function( x, y ) {
    this._setX( x );
    this._setY( y );
}

Ball.prototype.getX = function( ) {
    return this.x;
}

Ball.prototype.getY = function( ) {
    return this.y;
}

Ball.prototype.getWidth = function( ) {
    return this.img.width;
}

Ball.prototype.getHeight = function( ) {
    return this.img.height;
}

Ball.prototype.paint = function( ctx ) {
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

Ball.prototype._setX = function( value ) {
    this.x = value;
}

Ball.prototype._setY = function( value ) {
    this.y = value;
}

Ball.prototype._setCycleDuration = function( value ) {
    this.cycleDuration = value;
}

Ball.prototype._setWidth = function( value ) {
    this.img.width = value;
}

Ball.prototype._setHeight = function( value ) {
    this.img.height = value;
}

Ball.prototype._cycle = function() {
    this._move( );
    this._refreshDirection( );
}

Ball.prototype._calculeX = function( ) {
    return Math.sin( this._pasToRadians( this.direction ) ) * this.speed;
}

Ball.prototype._calculeY = function( ) { 
    return Math.cos( this._pasToRadians( this.direction ) ) * this.speed;
}

Ball.prototype._randomDirection = function( ) {
    this.setDirection( Math.round( Math.random() * this.LOOP_DIRECTION ) );
}

Ball.prototype._move = function( ) {
    var xIncrement = this._calculeX( );
    var yIncrement = this._calculeY( );
         
    this.setCoordinates( this.x + xIncrement, this.y - yIncrement );
}

Ball.prototype.differenceLoopToDirection = function( ) {
    this.setDirection( this.LOOP_DIRECTION - this.direction );
}

Ball.prototype.differenceLoopAndHalfToDirection = function( ) {
    this.setDirection( this.LOOP_DIRECTION + this.HALF_LOOP_DIRECTION - this.direction );
}

Ball.prototype._refreshDirection = function( ) {
    if( this.x < 0 ) {
        this.x = 0;
        this.differenceLoopToDirection( );
    }
    
    if( this.x + this.getHeight( ) > this.canvasWidth ) {
        this.x = this.canvasWidth - this.getHeight( );
        this.differenceLoopToDirection( );
    }
    
    if( this.y < 0 ) {
        this.y = 0;
        this.differenceLoopAndHalfToDirection( );
    }
    
    if( this.y + this.getHeight( ) > this.canvasHeight ) {
        this.y = this.canvasHeight - this.getHeight( );
        this.differenceLoopAndHalfToDirection( );
    }
}

Ball.prototype._pasToRadians = function( value ) {
    return value * Math.PI / this.HALF_LOOP_DIRECTION;
}