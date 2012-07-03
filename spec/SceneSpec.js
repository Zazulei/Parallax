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

        scene = new Scene('dimensions');
        expect(scene.height()).toEqual(120);
        expect(scene.width()).toEqual(100);

    });

    it("has a method for adding layers", function() {

        var aLayer = {};
        aLayer.calculeOffSet = function() {};
        
        var anotherLayer = {};
        anotherLayer.calculeOffSet = function() {};
        
        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        expect(scene.layers()).toEqual(2);
        expect(scene.getLayer(1)).toBe(anotherLayer);
        expect(scene.getLayer(2)).toBe(aLayer);

    });
    
    it("check adding layer called calculeOffSet", function() {

        var aLayer = {};
        aLayer.calculeOffSet = function() {};
        
        var anotherLayer = {};
        
        spyOn(aLayer, "calculeOffSet");
        anotherLayer.calculeOffSet = jasmine.createSpy();
        
        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);
    
        expect(aLayer.calculeOffSet).toHaveBeenCalled();
        expect(anotherLayer.calculeOffSet).toHaveBeenCalled();
    });

    it("initialize the loop when play is called", function() {
        spyOn(window, "setInterval");
        var scene = new Scene('dimensions');
        scene.play();
        var defaultCicleDuration = 30;
        expect(window.setInterval).toHaveBeenCalledWith(scene.cycle, defaultCicleDuration);

    });

    it("Calls layers compute in the cycle", function() {
        
        var aLayer = {};
        aLayer.compute = function() {};
        aLayer.paint = function() {};
        aLayer.calculeOffSet = function() {};
        
        var anotherLayer = {};

        spyOn(aLayer, "compute");
        anotherLayer.compute = jasmine.createSpy();
        anotherLayer.paint = jasmine.createSpy();
        anotherLayer.calculeOffSet = jasmine.createSpy();

        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        scene.cycle();

        expect(aLayer.compute).toHaveBeenCalled();
        expect(anotherLayer.compute).toHaveBeenCalled();
        
    });
    
    it("Calls layers Paint in the cycle", function() {
        
        var aLayer = {};
        aLayer.compute = function() {};
        aLayer.paint = function() {};
        aLayer.calculeOffSet = function() {};
        var anotherLayer = {};

        spyOn(aLayer, "paint");
        anotherLayer.compute = jasmine.createSpy();
        anotherLayer.paint = jasmine.createSpy();
        anotherLayer.calculeOffSet = jasmine.createSpy();

        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        scene.cycle();

        expect(aLayer.paint).toHaveBeenCalled();
        expect(anotherLayer.paint).toHaveBeenCalled();
        
    });

    
    it("Listening canvas mouse", function() {
        
        var canvasID = 'dimensions';
        var canvas = document.getElementById(canvasID);
        
        spyOn(canvas, "addEventListener");
        
        var scene = new Scene(canvasID);
        
        expect(canvas.addEventListener).toHaveBeenCalled();
        
    });
    
    it("Check Calcule Proportion", function() {
        
        var canvasID = 'dimensions';
        var canvas = document.getElementById(canvasID);
        
        var scene = new Scene(canvasID);
        
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initMouseEvent("mousemove", true, true, window, 0, 0, 0, 10, 15, false, false, false, false, 0, null);
        
        canvas.dispatchEvent( clickEvent );
        

        var calcule = scene.getMouseX( ) / scene.width( );
    
        expect( scene.calculeProportionX() ).toEqual( calcule );
        
    });

    it("checked mouse movement", function() {
        
        var canvasID = 'dimensions';
        var scene = new Scene(canvasID);
        var canvas = document.getElementById(canvasID);
        
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initMouseEvent("mousemove", true, true, window, 0, 0, 0, 10, 15, false, false, false, false, 0, null);
        
        canvas.dispatchEvent( clickEvent );
        
        expect(scene.getMouseX()).toEqual(10);
        expect(scene.getMouseY()).toEqual(15);
        
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