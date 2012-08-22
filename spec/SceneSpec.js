describe("Scene", function() {

    beforeEach(function() {

    });
    
    it("uses a canvas id for instantiation", function() {

        expect(instantiateOK).not.toThrow();
        expect(instantiateKO).toThrow();
        expect(instantiateNotCanvas).toThrow();

    });

    it("takes dimensions from canvas", function() {

        var defaultCanvasHeight = 150;
        var defaultCanvasWidth = 300;
        var scene = new Scene('nodimensions');
        expect(scene._height()).toEqual(defaultCanvasHeight);
        expect(scene._width()).toEqual(defaultCanvasWidth);
    });

    it("check cange size canvas", function() {

        var canvasWidth = 400;
        var canvasHeight = 350;
        var scene = new Scene('nodimensions');
        
        scene.setSize( canvasWidth, canvasHeight );
        
        expect(scene._width()).toEqual(canvasWidth);
        expect(scene._height()).toEqual(canvasHeight);
    });
    
    it("check adding layer", function() {
    
        var aLayer = {};
        aLayer.calculeOffSreen = function() {};
        
        var anotherLayer = {};
        anotherLayer.calculeOffSreen = function() {};
        
        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        expect(scene._layers()).toEqual(2);
        expect(scene._getLayer(1)).toBe(anotherLayer);
        expect(scene._getLayer(2)).toBe(aLayer);
    
    });
    
    it("check adding layer called calculeOffSreen", function() {

        var aLayer = {};
        aLayer.calculeOffSreen = function() {};
        
        var anotherLayer = {};
        
        spyOn(aLayer, "calculeOffSreen");
        anotherLayer.calculeOffSreen = jasmine.createSpy();
        
        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);
    
        expect(aLayer.calculeOffSreen).toHaveBeenCalled();
        expect(anotherLayer.calculeOffSreen).toHaveBeenCalled();
    });

    it("initialize the loop when play is called", function() {
        
        spyOn(window, "setInterval");
        var scene = new Scene('dimensions');
        
        spyOn(scene, "_cycle");
        
        scene.play();
        var defaultCicleDuration = 30;
       
        window.setInterval.mostRecentCall.args[0].call();
        
        expect(window.setInterval).toHaveBeenCalled();
        
        expect(scene._cycle).toHaveBeenCalled();
        expect( window.setInterval.mostRecentCall.args[1] ).toEqual( defaultCicleDuration );

    });

    it("Calls layers compute in the cycle", function() {
        
        var aBall = {};
        aBall.paint = function() {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        aBall.getX = function() {};
        
        var aLayer = {};
        aLayer.compute = function() {};
        aLayer.paint = function() {};
        aLayer.calculeOffSreen = function() {};
        
        var anotherLayer = {};

        spyOn(aLayer, "compute");
        anotherLayer.compute = jasmine.createSpy();
        anotherLayer.paint = jasmine.createSpy();
        anotherLayer.calculeOffSreen = jasmine.createSpy();

        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);
        
        scene.addBall( aBall );

        scene._cycle();

        expect(aLayer.compute).toHaveBeenCalled();
        expect(anotherLayer.compute).toHaveBeenCalled();
        
    });
    
    it("Calls layers Paint in the cycle", function() {
        
        var aBall = {};
        aBall.paint = function() {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        aBall.getX = function() {};
        
        var aLayer = {};
        aLayer.compute = function() {};
        aLayer.paint = function() {};
        aLayer.calculeOffSreen = function() {};
        var anotherLayer = {};

        spyOn(aLayer, "paint");
        anotherLayer.compute = jasmine.createSpy();
        anotherLayer.paint = jasmine.createSpy();
        anotherLayer.calculeOffSreen = jasmine.createSpy();

        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);
        
        scene.addBall( aBall );

        scene._cycle();

        expect(aLayer.paint).toHaveBeenCalled();
        expect(anotherLayer.paint).toHaveBeenCalled();
        
    });
    
    it("Check Calcule Proportion", function() {
        
        var canvasID = 'dimensions';
        var canvas = document.getElementById(canvasID);
        
        var scene = new Scene(canvasID);
        
        var aBall = {};
        aBall.paint = function() {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        aBall.getX = function() { return 10 };
        
        scene.addBall( aBall );        

        var calcule = aBall.getX( ) / scene._width( );
    
        expect( scene._calculeProportionX() ).toEqual( calcule );
        
    });

    it("check adding Object", function() {
    
        var aObject = {}; 
        aObject.setCanvasWidth = function() {};
        aObject.setCanvasHeight = function() {};
        
        var anotherObject = {};
        anotherObject.setCanvasWidth = function() {};
        anotherObject.setCanvasHeight = function() {};
        
        spyOn(aObject, "setCanvasWidth");
        spyOn(aObject, "setCanvasHeight");
        spyOn(anotherObject, "setCanvasWidth");
        spyOn(anotherObject, "setCanvasHeight");
        
        var scene = new Scene('dimensions');
        scene.addObject(aObject);
        scene.addObject(anotherObject);
        
        expect(scene._objects()).toEqual(2);
        expect(scene._getObject(1)).toBe(aObject);
        expect(scene._getObject(2)).toBe(anotherObject);
      
        expect(aObject.setCanvasWidth).toHaveBeenCalled();
        expect(aObject.setCanvasHeight).toHaveBeenCalled();
        expect(anotherObject.setCanvasWidth).toHaveBeenCalled();
        expect(anotherObject.setCanvasHeight).toHaveBeenCalled();
    
    });
    
    it("Calls Object Paint in the cycle", function() {
        
        var aObject = {};
        aObject.paint = function() {};
        aObject.setCanvasWidth = function() {};
        aObject.setCanvasHeight = function() {};
        
        var anotherObject = {};
        anotherObject.paint = function() {};
        anotherObject.setCanvasWidth = function() {};
        anotherObject.setCanvasHeight = function() {};
        
        spyOn(aObject, "paint");
        spyOn(anotherObject, "paint");
        
        var scene = new Scene('dimensions');
        scene.addObject(aObject);
        scene.addObject(anotherObject);

        scene._cycle();

        expect(aObject.paint).toHaveBeenCalled();
        expect(anotherObject.paint).toHaveBeenCalled();
        
    });
    
    it("Values for default", function() {
        var scene = new Scene('dimensions');
        
        expect(scene.cycleDuration).toEqual(30);
        expect(scene.color).toEqual('black');
        
    });
    
    it("check adding Ball", function() {
        
        var aBall = {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        
        spyOn(aBall, "setCanvasWidth");
        spyOn(aBall, "setCanvasHeight");
        
        
        var scene = new Scene('dimensions');
        scene.addBall( aBall );
        
        var index = scene._getIndexBall( );
    
        expect(aBall.setCanvasWidth).toHaveBeenCalled();
        expect(aBall.setCanvasHeight).toHaveBeenCalled();
        expect( scene._getObject( index ) ).toBe( aBall );
        
    });
    
    it("check adding Pad", function() {
        
        var aPad = {};
        aPad.setCanvasWidth = function() {};
        aPad.setCanvasHeight = function() {};
        
        spyOn(aPad, "setCanvasWidth");
        spyOn(aPad, "setCanvasHeight");
        
        
        var scene = new Scene('dimensions');
        scene.addPad( aPad );
        
        var index = scene._getIndexPad( );
    
        expect(aPad.setCanvasWidth).toHaveBeenCalled();
        expect(aPad.setCanvasHeight).toHaveBeenCalled();
        expect( scene._getObject( index ) ).toBe( aPad );
        
    });
    
    it("Ball collision to pad not a throw", function() {
        
        var toFail = function() {
            var scene = new Scene('dimensions');
            scene._isBallColisionToPad( );
        };
    
        expect( toFail ).not.toThrow( );
        
    });
    
    it("Check to Colision pad and Ball not colision", function() {
        
        var aBall = {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        aBall.getX = function() { return 10 };
        aBall.getY = function() { return 10 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        
        var aPad = {};
        aPad.setCanvasWidth = function() {};
        aPad.setCanvasHeight = function() {};
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 10 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        var scene = new Scene('dimensions');
        scene.addBall( aBall );
        scene.addPad( aPad );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( false );
        
        
        aBall.getX = function() { return 25 };
        aBall.getY = function() { return 10 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 30 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        
        expect( scene._isBallColisionToPad( ) ).toEqual( false );
        
        
        aBall.getX = function() { return 100 };
        aBall.getY = function() { return 100 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 30 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        expect( scene._isBallColisionToPad( ) ).toEqual( false );
        
    });
    
    xit("Check change to direction ball in colision", function() {
        
        var aBall = {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        aBall.getX = function() { return 21 };
        aBall.getY = function() { return 30 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        aBall.differenceLoopToDirection = function() {};
        aBall.differenceLoopAndHalfToDirection = function() {};
        
        // LEFT
        var aPad = {};
        aPad.setCanvasWidth = function() {};
        aPad.setCanvasHeight = function() {};
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 10 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        spyOn(aBall, "differenceLoopToDirection");
        spyOn(aBall, "differenceLoopAndHalfToDirection");
        
        var scene = new Scene('dimensions');
        scene.addBall( aBall );
        scene.addPad( aPad );
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect(aBall.differenceLoopToDirection).toHaveBeenCalled( );
        
        // RIGTH
        aBall.getX = function() { return 49 };
        aBall.getY = function() { return 10 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 10 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect(aBall.differenceLoopToDirection).toHaveBeenCalled();
        
        // TOP
        aBall.getX = function() { return 35 };
        aBall.getY = function() { return 21 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 30 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.differenceLoopAndHalfToDirection ).toHaveBeenCalled();
        
        // DOWN
        aBall.getX = function() { return 35 };
        aBall.getY = function() { return 129 };
        aBall.getWidth = function() { return 10 };
        aBall.getHeight = function() { return 10 };
        
        aPad.getX = function() { return 30 };
        aPad.getY = function() { return 30 };
        aPad.getWidth = function() { return 20 };
        aPad.getHeight = function() { return 100 };
        
        expect( scene._isBallColisionToPad( ) ).toEqual( true );
        expect( aBall.differenceLoopAndHalfToDirection ).toHaveBeenCalled();
        
    });
    
    it("Calcule _calculeProportionX", function() {
        
        var toFail = function() {
            var scene = new Scene('dimensions');
            scene._calculeProportionX( );
        };
    
        expect( toFail ).not.toThrow( );
        
    });
    
    var instantiateOK = function() {
        new Scene('dimensions');
    };

    var instantiateKO = function() {
         new Scene('non_exixting_canvas');
    };

    var instantiateNotCanvas = function() {
        new Scene('notCanvas');
    };
    
});