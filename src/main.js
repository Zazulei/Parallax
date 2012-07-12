function init( ) {
    
    var ball = new Ball();
    ball.setCoordinates( 100, 100 );
    ball.setSpeed( 5 );

    ball.play();
    
    var player1 = new Pad( );
    player1.setSpeed( 5 );
    
    player1.play( );
    
    var player2 = new Pad( );
    player2.setPathImg( 'img/pad.jpg' );
    player2.setCoordinates( 415, 10 );
    player2.setSpeed( 10 );
    
    player2.play( );
    
    var rio = new Layer( );
    rio.setPathImg( 'img/rio.jpg' );
    
    var nube = new Layer( );
    nube.setPathImg( 'img/nubesPajaros.png' );
    nube.setOffSetY( 10 );
    
    var scene = new Scene( 'canvas' );
    scene.setColor( 'red' );
    
    scene.addLayer( rio );
    scene.addLayer( nube );
    
    scene.addObject( player1 );
    scene.addObject( player2 );
    scene.addBall( ball );
    
    scene.play( );
}
