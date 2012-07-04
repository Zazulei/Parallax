function init( ) {
    var rio = new Layer( );
    rio.setPathImg( 'img/rio.jpg' );
    
    var nube = new Layer( );
    nube.setPathImg( 'img/nubesPajaros.png' );
    nube.setOffSetY( 10 );
    
    var scene = new Scene( 'canvas' );
    scene.addLayer( rio );
    scene.addLayer( nube );
    scene.play( );
}
