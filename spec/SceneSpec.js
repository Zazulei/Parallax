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
        expect(scene.height()).toEqual(defaultCanvasHeight);
        expect(scene.width()).toEqual(defaultCanvasWidth);
    });

    it("check cange size canvas", function() {

        var canvasHeight = 350;
        var canvasWidth = 400;
        var scene = new Scene('nodimensions');
        
        scene.setHeight( canvasHeight );
        scene.setWidth( canvasWidth );
        
        expect(scene.height()).toEqual(canvasHeight);
        expect(scene.width()).toEqual(canvasWidth);
    });
    
    it("check adding layer", function() {
    
        var aLayer = {};
        aLayer.calculeOffSreen = function() {};
        
        var anotherLayer = {};
        anotherLayer.calculeOffSreen = function() {};
        
        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        expect(scene.layers()).toEqual(2);
        expect(scene.getLayer(1)).toBe(anotherLayer);
        expect(scene.getLayer(2)).toBe(aLayer);
    
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
        aBall.x = 10;
        
        scene.addBall( aBall );        

        var calcule = aBall.x / scene.width( );
    
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
        
        expect(scene.objects()).toEqual(2);
        expect(scene.getObject(1)).toBe(aObject);
        expect(scene.getObject(2)).toBe(anotherObject);
      
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
        
        expect(scene._cycleDuration).toEqual(30);
        expect(scene._color).toEqual('black');
        
    });
    
    it("check adding Ball", function() {
        
        var aBall = {};
        aBall.setCanvasWidth = function() {};
        aBall.setCanvasHeight = function() {};
        
        spyOn(aBall, "setCanvasWidth");
        spyOn(aBall, "setCanvasHeight");
        
        
        var scene = new Scene('dimensions');
        scene.addBall( aBall );
        
        var index = scene.getIndexBall( );
    
        expect(aBall.setCanvasWidth).toHaveBeenCalled();
        expect(aBall.setCanvasHeight).toHaveBeenCalled();
        expect( scene.getObject( index ) ).toBe( aBall );
        
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