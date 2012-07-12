function Scene(canvasID) {
    this._color = undefined;
    this._indexBall = undefined;
    this._cycleDuration = undefined;
    this._canvas = undefined;
    
    this._layerStack = new Array( );
    this._objectStack = new Array( );
    
    this._prepareCanvas( canvasID );
    
    this._setDefaultValues( );
}

Scene.prototype._setDefaultValues = function( ) {
    this._cycleDuration = 30;
    this.setColor( 'black' );
}

Scene.prototype._prepareCanvas = function( canvasID ) {
    this._canvas = document.getElementById( canvasID );
    this._checkExists();
    this._checkCanvas();
}

Scene.prototype._checkExists = function() {
    if (!this._canvas) {
        throw ("element does not exists");
    }
}

Scene.prototype._checkCanvas = function() {
    if (this._canvas.tagName != "CANVAS") {
        throw ("element not canvas");
    }
}

Scene.prototype.width = function() {
    return this._canvas.width;
}

Scene.prototype.height = function() {
    return this._canvas.height;
}

Scene.prototype.addLayer = function(layer) {
    layer.calculeOffSreen( this.width( ) );
    this._layerStack.push( layer );
}

Scene.prototype.getLayer = function(ordinal) {
    var index = ordinal - 1;
    return this._layerStack[ index ];
}

Scene.prototype.layers = function() {
    return this._layerStack.length;
}

Scene.prototype.addObject = function(object) {
    object.setCanvasWidth( this.width( ) );
    object.setCanvasHeight( this.height( ) );
    this._objectStack.push( object );
}

Scene.prototype.getObject = function(ordinal) {
    var index = ordinal - 1;
    return this._objectStack[ index ];
}

Scene.prototype.objects = function() {
    return this._objectStack.length;
}

Scene.prototype.addBall = function(ball) {
    this.addObject( ball );
    this._indexBall = this.objects( );
}

Scene.prototype.getIndexBall = function( ) {
    return this._indexBall;
}

Scene.prototype.getBall = function( ) {
    var index = this.getIndexBall( );
    return this.getObject( index );
}

Scene.prototype.play = function() {
    var self = this;
    setInterval( function( ) { self._cycle( ) } , this._cycleDuration );
}

Scene.prototype._calculeProportionX = function() {
    var ball = this.getBall( );
    return ( ball.x / this.width( ) );
}

Scene.prototype._cycle = function() {
    this._clearCanvas( );
    var ctx = this._canvas.getContext('2d');
    
    this._paint( ctx );
    this._drwaLayers( ctx );
    this._drwaObjects( ctx );
}

Scene.prototype._drwaLayers = function( ctx ) {
    var size = this.layers( );
    for( var i = 1; i <= size; i++ ) {
        var theLayer = this.getLayer( i );
        theLayer.compute( this._calculeProportionX( ) );
        theLayer.paint( ctx );
    }
}

Scene.prototype._drwaObjects = function( ctx ) {
    var size = this.objects( );
    for( var i = 1; i <= size; i++ ) {
        var theObject = this.getObject( i );
        theObject.paint( ctx );
    }
}

Scene.prototype._paint = function( ctx ) {
    ctx.fillStyle = this.color;
    ctx.fillRect( 0, 0, this.width(), this.height() );
}

Scene.prototype._clearCanvas = function( ) {
    this._canvas.width = this._canvas.width;
}

Scene.prototype.setWidth = function( value ) {
    this._canvas.width = value;
}

Scene.prototype.setHeight = function( value ) {
    this._canvas.height = value;
}

Scene.prototype.setColor = function( value ) {
    this._color = value;
}