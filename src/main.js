function init( ) {
    
    var aBall = new Ball();
    aBall.setCoordinates( 100, 100 );
    aBall.setSpeed( 5 );
    aBall.setSize( 15, 15 );
    aBall.setColor( 'blue' );
    aBall.setDirection( 45 );

    aBall.play();
    
    var ball1 = new Ball();
    ball1.setCoordinates( 300, 300 );
    ball1.setSpeed( 3 );
    
    ball1.play();
    
    var ball2 = new Ball();
    ball2.setCoordinates( 200, 300 );
    ball2.setSpeed( 6 );

    ball2.play();
    
    var ball3 = new Ball();
    ball3.setCoordinates( 300, 300 );
    ball3.setSpeed( 9 );

    ball3.play();
    
    var player1 = new Pad( );
    player1.setSpeed( 5 );
    
    player1.play( );
    
    var player2 = new Pad( );
    player2.setPathImg( 'img/pad.jpg' );
    player2.setCoordinates( 120, 10 );
    player2.setSpeed( 5 );
    //player2.setSize( 300, 300 );
    
    player2.play( );
    
    var rio = new Layer( );
    rio.setPathImg( 'img/rio.jpg' );
    
    var nube = new Layer( );
    nube.setPathImg( 'img/nubesPajaros.png' );
    nube.setOffSetY( 10 );
    
    var scene = new Scene( 'canvas' );
    scene.setSize( 450, 383 );
    scene.setColor( 'red' );
    
    scene.addLayer( rio );
    scene.addLayer( nube );
    
    scene.addObject( player1 );
    scene.addObject( ball1 );
    scene.addObject( ball2 );
    scene.addObject( ball3 );
    
    scene.addBall( aBall );
    
    scene.addPad( player2 );
    
    scene.play( );
}
