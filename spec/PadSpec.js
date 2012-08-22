describe("Pad", function() {

    beforeEach(function() {

    });
    
    it("Values for default", function( ) {
        
        var pad = new Pad();
                      
        expect( pad.getWidth( ) ).toEqual( 25 );
        expect( pad.getHeight( ) ).toEqual( 100 );
        expect( pad.x ).toEqual( 10 );
        expect( pad.y ).toEqual( 10 );
        expect( pad.cycleDuration ).toEqual( 30 );
        expect( pad.speed ).toEqual( 5 );
        expect( pad.color ).toEqual( 'green' );
        
    });

    it("Width and Height Get and Set is OK", function() {
        
        var pad = new Pad();

        pad.setSize( 10, 20 );
                        
        expect( pad.getWidth( ) ).toEqual( 10 );
        expect( pad.getHeight( ) ).toEqual( 20 );
        
    });

    it("X and Y Get and Set is OK", function() {
        
        var pad = new Pad();
        
        pad.setCoordinates( 10, 20 );
                        
        expect( pad.x ).toEqual( 10 );
        expect( pad.y ).toEqual( 20 );
        
    });

    it("speed Get and Set is OK", function() {
        
        var pad = new Pad();
        
        pad.setSpeed( 5 );
                        
        expect( pad.speed ).toEqual( 5 );
        
    });
    
    it("Check capture Event key", function() {
        
        var pad = new Pad();
        
        var evtKeyDown = document.createEvent('UIEvents');
        evtKeyDown.initUIEvent('keydown', true, true, window, 0);
        evtKeyDown.keyCode = 115;
        
        canvas.dispatchEvent( evtKeyDown );
        
        expect( pad.lastKey ).toEqual( 115 );
        
        var keyUp = document.createEvent('UIEvents');
        keyUp.initUIEvent('keyup', true, true, window, 0);
        keyUp.keyCode = 115;
        
        canvas.dispatchEvent( keyUp );
        
        expect( pad.lastKey ).not.toBeDefined();
        
    });
    
    it("Check move prees key not avalid", function() {
        
        var toFail = function() {
            var pad = new Pad();
            pad.lastKey = 10;
            pad._move();
        };
    
        expect( toFail ).not.toThrow( );
        
    });
    
    it("Check move to pad", function() {
        
        var pad = new Pad();
        
        pad._setY( 10 );
        pad.setSpeed( 5 );
        
        var evtKeyDown = document.createEvent('UIEvents');
        evtKeyDown.initUIEvent('keydown', true, true, window, 0);
        
        evtKeyDown.keyCode = KEY.up;
        canvas.dispatchEvent( evtKeyDown );
        
        pad._move( );
        
        expect( pad.y ).toEqual( 5 );
        
        evtKeyDown.keyCode = KEY.down;
        canvas.dispatchEvent( evtKeyDown );
        
        pad._move( );
        
        expect( pad.y ).toEqual( 10 );
        
        var keyUp = document.createEvent('UIEvents');
        keyUp.initUIEvent('keyup', true, true, window, 0);
        keyUp.keyCode = KEY.down;
        
        canvas.dispatchEvent( keyUp );
   
        pad._move( );
        
        expect( pad.y ).toEqual( 10 ); 
    });

    it("Check paint to pad", function() {
        
        canvas = document.getElementById('dimensions');
        ctx = canvas.getContext('2d');
        
        spyOn(ctx, "drawImage");
        
        pad = new Layer( );
        pad.paint( ctx );
        
        expect(ctx.drawImage).toHaveBeenCalled();
        
    });
    
    it("initialize the loop when play is called", function() {
        
        spyOn(window, "setInterval");
        var pad = new Pad( );
        
        spyOn(pad, "_cycle");
        
        pad.play();
        var defaultCicleDuration = 30;
       
        window.setInterval.mostRecentCall.args[0].call();
        
        expect(window.setInterval).toHaveBeenCalled();
        
        expect(pad._cycle).toHaveBeenCalled();
        expect( window.setInterval.mostRecentCall.args[1] ).toEqual( defaultCicleDuration );

    });
    
    
    it("Limited in canvas", function() {
        
        var pad = new Pad( );
        pad.setSize( 100, 100 );
        pad.setCanvasHeight( 300 );

        expect( pad._limiterMin( -100 ) ).toEqual( 0 );
        expect( pad._limiterMax( 1000 ) ).toEqual( 200 );
        
    });
         
});