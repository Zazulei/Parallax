function init( ) {
    var rio = new Layer( );
    rio.setPathImg( 'img/rio.jpg' );
    
    var nube = new Layer( );
    nube.setPathImg( 'img/prb.png' );
    
    var scene = new Scene( 'canvas' );
    scene.addLayer( rio );
    scene.addLayer( nube );
    scene.play( );
}
