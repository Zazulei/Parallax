function Scene(canvasID) {
    this.cycleDuration = 30;
  
  
    this.canvas = document.getElementById(canvasID);

    this.checkExists(this.canvas);
    this.checkCanvas(this.canvas);
    
    this.layerStack = new Array( );
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
  setInterval( this.cycle, this.cycleDuration );
}


Scene.prototype.cycle = function() {  
  var size = this.layers( );
  for( var i = 1; i <= size; i++ ) {
    var theLayer = this.getLayer( i );
    theLayer.compute( );
  }
  
}