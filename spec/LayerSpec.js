describe("Layer", function() {

    beforeEach(function() {

    });

    it("Create layer", function() {
        var layer = new Layer( );
        layer._setWidth( 100 );
        layer.calculeOffSreen( 50 );
        expect( layer._getOffSreen( ) ).toEqual( 50 );
    });
    
    it("Check Off Set Y", function() {
        var alayer = new Layer( );
        
        var offSetYDefault = 0;
        expect( alayer.offSetY ).toEqual( offSetYDefault );
        
        var anotherLayer = new Layer( );
        
        anotherLayer.setOffSetY( 25 );
        expect( anotherLayer.offSetY ).toEqual( 25 );
    });
    
    it("Check paint to layer", function() {
        canvas = document.getElementById('dimensions');
        ctx = canvas.getContext('2d');
        
        spyOn(ctx, "drawImage");
        
        layer = new Layer( );
        layer.paint( ctx );
        
        expect(ctx.drawImage).toHaveBeenCalled();
    });
    
    it("Check is move OK", function() {
        var layer = new Layer( );
        layer._setWidth( 600 );
        layer.calculeOffSreen( 400 );
        
        layer.compute( 0.5 );
        expect( layer.x ).toEqual( 100 );
        
        layer.compute( 0.9 );
        expect( layer.x ).toEqual( 180 );
        
        layer.compute( 0.1 );
        expect( layer.x ).toEqual( 20 );
    })

});