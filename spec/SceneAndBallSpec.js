describe("Scene And Ball", function() {

    var aBall, aPad, scene;
    beforeEach(function() {
        createBall( );
        createPad( );
        createScene( );
    });
   
    it("has to detect collision in the corner of the pad", function() {
        
        aBall.setCoordinates( 50, 130 );
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        
        aBall.setCoordinates( 20, 130 );
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
    
    });
    
    it("Must collide if inside the pad", function() {
        
        aBall.setCoordinates( 50, 30 );
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        
    });
    
    
    it("Not collide inside the pad", function() {
        
        aBall.setCoordinates( 19, 130);
        expect( scene._isBallColisionToPad( ) ).toEqual( false );
        
    });
     
    it("Rebound on top left corner correctly", function() {
   
        scene.isCrashing = false;
        aBall.setCoordinates( 25, 25 );
        aBall.setDirection(135 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 315 );
        
        scene.isCrashing = false;
        aBall.setDirection( 135 );
        aBall.setCoordinates( 21, 25 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 225 );
        
        scene.isCrashing = false;
        aBall.setDirection( 135 );
        aBall.setCoordinates( 25, 21 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 45 );
        
    });
        
    it("Rebound on left down corner correctly", function() {

        
        scene.isCrashing = false;
        aBall.setCoordinates( 25, 125 );
        aBall.setDirection( 45 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 225 );
        
        scene.isCrashing = false;
        aBall.setDirection( 45 );
        aBall.setCoordinates( 25, 129 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 135 );
        
        scene.isCrashing = false;
        aBall.setDirection( 45 );
        aBall.setCoordinates( 21, 125 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 315 );
        
    });
    
    it("Rebound on right top corner correctly", function() {
        
        scene.isCrashing = false;
        aBall.setCoordinates( 45, 25 );
        aBall.setDirection( 225 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 45 );
        
        scene.isCrashing = false;
        aBall.setDirection( 225 );
        aBall.setCoordinates( 49, 25 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 135 );
        
        scene.isCrashing = false;
        aBall.setDirection( 225 );
        aBall.setCoordinates( 45, 21 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 315 );
        
    });
    
    it("Rebound on right down corner correctly", function() {
        
        scene.isCrashing = false;
        aBall.setCoordinates( 45, 125 );
        aBall.setDirection( 315 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 135 );
        
        scene.isCrashing = false;
        aBall.setDirection( 315 );
        aBall.setCoordinates( 49, 125 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 45 );
        
        scene.isCrashing = false;
        aBall.setDirection( 315 );
        aBall.setCoordinates( 45, 129 );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.direction ).toEqual( 225 );
        
    });
    
    xit("Check colision move pad and crash", function() {
        
    });
    
    function createBall( ) {
        aBall = new Ball( );
        aBall.setSize( 10, 10 );
    }
    
    function createPad( ) {
        aPad = {};
        aPad.setCanvasWidth = function() {};
        aPad.setCanvasHeight = function() {};
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 30 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
    }
    
    function createScene( ) {
        scene = new Scene( 'dimensions' );
        scene.addBall( aBall );
        scene.addPad( aPad );
    }
    
});