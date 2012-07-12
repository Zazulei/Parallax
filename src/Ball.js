function Ball( ) {    
    this.x;
    this.y;
    this.speed;
    this.color;
    
    this.img = new Image( );
    
    this.direction;
    
    this.canvasHeight;
    this.canvasWidth;

    this.randomDirection( );
    this.setSpeed( 5 );
    this.setCoordinates( 0, 0 );
    this.setColor( 'black' );
    this.setHeight( 15 );
    this.setWidth( 15 );
    this.cycleDuration = 30;
}

Ball.prototype.colision = function( ) {
    
    if( this.x < 0 ) {
        this.x = 0;
        this.setDirection( 360 - this.direction );
    }
    
    if( this.y < 0 ) {
        this.y = 0;
        if( this.direction <= 180 )
            this.setDirection( 180 - this.direction );
        else
            this.setDirection( 540 - this.direction );
    }
    
    if( this.y + this.getHeight( ) > this.canvasHeight ) {
        this.y = this.canvasHeight - this.getHeight( );
        if( this.direction <= 180 )
            this.setDirection( 180 - this.direction );
        else
            this.setDirection( 540 - this.direction );
        
    }
    
    if( this.x + this.getHeight( ) > this.canvasWidth ) {
        this.x = this.canvasWidth - this.getHeight( );
        this.setDirection( 360 - this.direction );
    }
}

Ball.prototype.pasToRadians = function( value ) {
    return value * Math.PI / 180;
}

Ball.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self.cycle( ) } , this.cycleDuration );
}

Ball.prototype.cycle = function() {
    this.move( );
    this.colision( );
}

Ball.prototype.move = function( ) {
    var xIncrement = this.calculeX( );
    var yIncrement = this.calculeY( );
         
    this.setX( this.x + xIncrement );
    this.setY( this.y - yIncrement );
}

Ball.prototype.calculeX = function( ) {
    return Math.sin( this.pasToRadians( this.direction ) ) * this.speed;
}

Ball.prototype.calculeY = function( ) { 
    return Math.cos( this.pasToRadians( this.direction ) ) * this.speed;
}

Ball.prototype.randomDirection = function( ) {
    this.setDirection( Math.round( Math.random() * 360 ) );
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

Ball.prototype.setWidth = function( value ) {
    this.img.width = value;
}

Ball.prototype.setHeight = function( value ) {
    this.img.height = value;
}

Ball.prototype.setCoordinates = function( x, y ) {
    this.setX( x );
    this.setY( y );
}

Ball.prototype.setX = function( value ) {
    this.x = value;
}

Ball.prototype.setY = function( value ) {
    this.y = value;
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