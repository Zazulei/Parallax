function Scene(canvasID) {
    this.cycleDuration = 30;
  
    this.canvas = document.getElementById(canvasID);
    
    this.checkExists(this.canvas);
    this.checkCanvas(this.canvas);
    
    this.layerStack = new Array( );
    
    this.mouseX;
    this.mouseY;
    this.activateCaptureMouse();
}

Scene.prototype.activateCaptureMouse = function() {
    var theObj = this;
    
    this.canvas.addEventListener('mousemove',function( evt ){
        var x = evt.clientX;
        var y = evt.clientY;
         
        theObj.setCoordinates( x, y );
    }, false );
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

Scene.prototype.addLayer = function(layer) {
    layer.calculeOffSet( this.width( ) );
    this.layerStack.push( layer );
}

Scene.prototype.getLayer = function(ordinal) {
    var index = ordinal - 1;
    return this.layerStack[ index ];
}

Scene.prototype.layers = function() {
    return this.layerStack.length;
}

Scene.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self.cycle( ) } , this.cycleDuration );
}

Scene.prototype.calculeProportionX = function() {
    return ( this.mouseX / this.width( ) );
}

Scene.prototype.cycle = function() {
    this.clearCanvas( );
    var ctx = this.canvas.getContext('2d');
    var size = this.layers( );
    for( var i = 1; i <= size; i++ ) {
        var theLayer = this.getLayer( i );
        theLayer.compute( this.calculeProportionX( ) );
        theLayer.paint( ctx );
    }
}

Scene.prototype.clearCanvas = function( ) {
    this.canvas.width = this.canvas.width;
}
