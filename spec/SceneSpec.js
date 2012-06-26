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
        var anotherLayer = {};
        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        expect(scene.layers()).toEqual(2);
        expect(scene.getLayer(1)).toBe(anotherLayer);
        expect(scene.getLayer(2)).toBe(aLayer);

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
        var anotherLayer = {};

        spyOn(aLayer, "compute");
        anotherLayer.compute = jasmine.createSpy();

        var scene = new Scene('dimensions');
        scene.addLayer(anotherLayer);
        scene.addLayer(aLayer);

        scene.cycle();

        expect(aLayer.compute).toHaveBeenCalled();
        expect(anotherLayer.compute).toHaveBeenCalled();
    });

    
    it("Listening canvas mouse", function() {
 
    });

    
    xit("Paint to canvas", function() {
 
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