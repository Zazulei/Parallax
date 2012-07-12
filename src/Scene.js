function Scene(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.color;
    
    this.checkExists(this.canvas);
    this.checkCanvas(this.canvas);
    
    this.layerStack = new Array( );
    this.objectStack = new Array( );
    
    this.indexBall;
    
    this.mouseX;
    this.mouseY;
    this.activateCaptureMouse();
    
    this.cycleDuration = 30;
    this.setColor( 'black' );
}

Scene.prototype.activateCaptureMouse = function() {
    var theObj = this;
    
    this.canvas.addEventListener('mousemove',function( evt ){
        var x = evt.clientX;
        var y = evt.clientY;
         
        theObj.setCoordinates( x, y );
    }, false );
}

Scene.prototype.setColor = function( value ) {
    this.color = value;
}

Scene.prototype.setMouseX = function(value) {
    this.mouseX = value;
}

Scene.prototype.setMouseY = function(value) {
    this.mouseY = value;
}

Scene.prototype.getMouseX = function() {
    return this.mouseX;
}

Scene.prototype.getMouseY = function() {
    return this.mouseY;
}

Scene.prototype.setCoordinates = function( x, y ) {
    this.setMouseX( x );
    this.setMouseY( y );
}

Scene.prototype.checkExists = function(canvas) {
    if (!canvas) {
        throw ("element does not exists");
    }
}

Scene.prototype.checkCanvas = function(canvas) {
    if (canvas.tagName != "CANVAS") {
        throw ("element not canvas");
    }
}

Scene.prototype.width = function() {
    return this.canvas.width;
}

Scene.prototype.height = function() {
    return this.canvas.height;
}

Scene.prototype.setWidth = function( value ) {
    this.canvas.width = value;
}

Scene.prototype.setHeight = function( value ) {
    this.canvas.height = value;
}

Scene.prototype.addLayer = function(layer) {
    layer.calculeOffSreen( this.width( ) );
    this.layerStack.push( layer );
}

Scene.prototype.getLayer = function(ordinal) {
    var index = ordinal - 1;
    return this.layerStack[ index ];
}

Scene.prototype.layers = function() {
    return this.layerStack.length;
}

Scene.prototype.addObject = function(object) {
    object.setCanvasWidth( this.width( ) );
    object.setCanvasHeight( this.height( ) );
    this.objectStack.push( object );
}

Scene.prototype.getObject = function(ordinal) {
    var index = ordinal - 1;
    return this.objectStack[ index ];
}

Scene.prototype.objects = function() {
    return this.objectStack.length;
}

Scene.prototype.addBall = function(ball) {
    this.addObject( ball );
    this.indexBall = this.objects( );
}

Scene.prototype.getIndexBall = function( ) {
    return this.indexBall;
}

Scene.prototype.getBall = function( ) {
    var index = this.getIndexBall( );
    return this.getObject( index );
}

Scene.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self.cycle( ) } , this.cycleDuration );
}

Scene.prototype.calculeProportionX = function() {
    var ball = this.getBall( );
    return ( ball.x / this.width( ) );
}

Scene.prototype.cycle = function() {
    this.clearCanvas( );
    var ctx = this.canvas.getContext('2d');
    
    this.paint( ctx );
    
    var size = this.layers( );
    for( var i = 1; i <= size; i++ ) {
        var theLayer = this.getLayer( i );
        theLayer.compute( this.calculeProportionX( ) );
        theLayer.paint( ctx );
    }
    
    size = this.objects( );
    for( var i = 1; i <= size; i++ ) {
        var theObject = this.getObject( i );
        theObject.paint( ctx );
    }
}

Scene.prototype.paint = function( ctx ) {
    ctx.fillStyle = this.color;
    ctx.fillRect( 0, 0, this.width(), this.height() );
}

Scene.prototype.clearCanvas = function( ) {
    this.canvas.width = this.canvas.width;
}
