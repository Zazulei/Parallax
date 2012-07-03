function init( ) {
    var layer = new Layer( );
    layer.setPathImg( 'img/rio.jpg' );
    //layer.setPathImg( 'img/prb.png' );
    
    var scene = new Scene( 'canvas' );
    scene.addLayer( layer );
    scene.play( );
}
