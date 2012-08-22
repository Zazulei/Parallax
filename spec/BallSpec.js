describe("Ball", function() {

    beforeEach(function() {

    });
    
    it("Check Random", function( ) {
        var aBall = new Ball( );
        expect( aBall.direction ).toBeLessThan( 361 );
        expect( aBall.direction ).toBeGreaterThan( -1 );
    });
    
    it("Check colision Y Top", function( ) {
        var aBall = new Ball( );
        
        aBall.setDirection( 0 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 180 );
        
        aBall.setDirection( 30 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 150 );
        
        aBall.setDirection( 45 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 135 );
        
        aBall.setDirection( 80 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 100 );
        
        aBall.setDirection( 330 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 210 );
        
        aBall.setDirection( 315 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 225 );
        
        aBall.setDirection( 300 );
        aBall.setCoordinates( 10, -10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 240 );
    });
    
    it("Check colision Y Down", function( ) {
        
        var aBall = new Ball( );
        aBall.setCanvasHeight( 500 );
        
        aBall.setDirection( 180 );
        aBall.setCoordinates( 10, 1000 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 0 );
        
        aBall.setDirection( 150 );
        aBall.setCoordinates( 10, 1000 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 30 );
        
        aBall.setDirection( 225 );
        aBall.setCoordinates( 10, 1000 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 315 );
        
        aBall.setDirection( 240 );
        aBall.setCoordinates( 10, 1000 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 300 );
        
    });    
    
    it("Check colision X Left", function( ) {
        
        var aBall = new Ball( );
        
        aBall.setDirection( 90 );
        aBall.setCoordinates( -10, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 270 );
        
        aBall.setDirection( 135 );
        aBall.setCoordinates( -10, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 225 );
        
        aBall.setDirection( 170 );
        aBall.setCoordinates( -10, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 190 );
        
    });
    
    
    it("Check colision X Rigth", function( ) {
        
        var aBall = new Ball( );
        aBall.setCanvasWidth( 500 );
        
        aBall.setDirection( 270 );
        aBall.setCoordinates( 1000, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 90 );
        
        aBall.setDirection( 225 );
        aBall.setCoordinates( 1000, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 135 );
        
        aBall.setDirection( 200 );
        aBall.setCoordinates( 1000, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 160 );
        
        aBall.setDirection( 315 );
        aBall.setCoordinates( 1000, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 45 );
        
        aBall.setDirection( 340 );
        aBall.setCoordinates( 1000, 10 );
        aBall._refreshDirection( );
        expect( aBall.direction ).toEqual( 20 );
        
    });

    
    it("Values for default", function( ) {
    
        var ball = new Ball( );
        
        expect( ball.getHeight() ).toEqual( 15 );
        expect( ball.getWidth() ).toEqual( 15 );
        expect( ball.speed ).toEqual( 5 );
        expect( ball.x ).toEqual( 0 );
        expect( ball.y ).toEqual( 0 );
        expect( ball.color ).toEqual( 'black' );
        expect( ball.cycleDuration ).toEqual( 30 );
        expect( ball.direction ).toBeDefined();
        
    });
    
    it("Check move", function( ) {
    
        var ball = new Ball();
        ball.setDirection( 30 );
        ball.setSpeed( 10 );
        ball._move( );
    
        expect( ball.x ).toBeCloseTo( 5, 0.5 );      
        expect( ball.y ).toBeCloseTo( -9, -0.5 );
        
        ball.setDirection( 150 );
        ball.setCoordinates( 0, 0 );
        ball._move();
        
        expect( ball.x ).toBeCloseTo( 5, 0.5 );      
        expect( ball.y ).toBeCloseTo( 9, -0.5 );
        
        ball.setDirection( 210 );
        ball.setCoordinates( 0, 0 );
        ball._move();
        
        expect( ball.x ).toBeCloseTo( -5, -0.5 );      
        expect( ball.y ).toBeCloseTo( 9, -0.5 );
        
        ball.setDirection( 330 );
        ball.setCoordinates( 0, 0 );
        ball._move();
        
        expect( ball.x ).toBeCloseTo( -5, -0.5 );      
        expect( ball.y ).toBeCloseTo( -9, -0.5 );
        
    });
    
    it("Canvas Height and Width", function( ) {
        
        var ball = new Ball( );
        
        ball.setCanvasHeight( 30 );
        ball.setCanvasWidth( 60 );
        
        expect( ball.canvasHeight ).toEqual( 30 );
        expect( ball.canvasWidth ).toEqual( 60 );

    });
    
    it("Check X and Y", function( ) {
    
        var ball = new Ball( );
        
        expect( ball.x ).toEqual( 0 );
        expect( ball.y ).toEqual( 0 );
        
    });
    
    it("X and Y Get and Set is OK", function() {
        
        var ball = new Ball( );
        
        ball.setCoordinates( 10, 20 );
                        
        expect( ball.x ).toEqual( 10 );
        expect( ball.y ).toEqual( 20 );
        
    });
    
    it("Check Width and Height", function( ) {
    
        var ball = new Ball( );
        
        ball.setSize( 10, 100 )
        
        expect( ball.getWidth( ) ).toEqual( 10 );
        expect( ball.getHeight( ) ).toEqual( 100 );
     
    });
    
    it("Check paint to ball", function( ) {
    
        canvas = document.getElementById('dimensions');
        ctx = canvas.getContext('2d');
        
        spyOn(ctx, "drawImage");
        
        ball = new Ball( );
        ball.setPathImg( 'prb' );
        ball.paint( ctx );
        
        expect(ctx.drawImage).toHaveBeenCalled();
        
    });
    
    it("Check Set Direction", function( ) {
        var ball = new Ball( );
        ball.setDirection( 415 );
        expect( ball.direction ).toEqual( 55 );
    });
    
    it("initialize the loop when play is called", function() {
        
        spyOn(window, "setInterval");
        var ball = new Ball( );
        
        spyOn(ball, "_cycle");
        
        ball.play();
        var defaultCicleDuration = 30;
       
        window.setInterval.mostRecentCall.args[0].call();
        
        expect(window.setInterval).toHaveBeenCalled();
        
        expect(ball._cycle).toHaveBeenCalled();
        expect( window.setInterval.mostRecentCall.args[1] ).toEqual( defaultCicleDuration );
        
    });
    
});