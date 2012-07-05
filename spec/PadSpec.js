describe("Pad", function() {

    beforeEach(function() {

    });

    it("Width and Height Get and Set is OK", function() {
        
        var pad = new Pad();
        
        pad.setWidth( 10 );
        pad.setHeight( 20 );
                        
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
        expect( KEY.pressing[115] ).toBe( true );
        
        var keyUp = document.createEvent('UIEvents');
        keyUp.initUIEvent('keyup', true, true, window, 0);
        keyUp.keyCode = 115;
        
        canvas.dispatchEvent( keyUp );
        
        expect( KEY.pressing[115] ).toBe( false );
        
    });
    
    
    it("Check move to pad", function() {
        
        var pad = new Pad();
        
        pad.setY( 10 );
        pad.setSpeed( 5 );
        
        var evtKeyDown = document.createEvent('UIEvents');
        evtKeyDown.initUIEvent('keydown', true, true, window, 0);
        
        evtKeyDown.keyCode = KEY.up;
        canvas.dispatchEvent( evtKeyDown );
        
        pad.move( );
        
        expect( pad.y ).toEqual( 5 );
        
        evtKeyDown.keyCode = KEY.down;
        canvas.dispatchEvent( evtKeyDown );
        
        pad.move( );
        
        expect( pad.y ).toEqual( 10 );
        
        var keyUp = document.createEvent('UIEvents');
        keyUp.initUIEvent('keyup', true, true, window, 0);
        keyUp.keyCode = KEY.down;
        
        canvas.dispatchEvent( keyUp );
   
        pad.move( );
        
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
        var pad = new Pad('dimensions');
        
        spyOn(pad, "cycle");
        
        pad.play();
        var defaultCicleDuration = 30;
       
        window.setInterval.mostRecentCall.args[0].call();
        
        expect(window.setInterval).toHaveBeenCalled();
        
        expect(pad.cycle).toHaveBeenCalled();
        expect( window.setInterval.mostRecentCall.args[1] ).toEqual( defaultCicleDuration );

    });
    
    
    it("Move limited in canvas", function() {
    
    }
    
    
         
});