describe("Layer", function() {

    beforeEach(function() {

    });

    it("Create layer", function() {
        var layer = new Layer( );
        layer.setWidth( 100 );
        layer.calculeOffSet( 50 );
        expect( layer.getOffSet( ) ).toEqual( 50 );
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
        layer.setWidth( 600 );
        layer.calculeOffSet( 400 );
        
        layer.compute( 0.5 );
        expect( layer.getX( ) ).toEqual( 100 );
        
        layer.compute( 0.9 );
        expect( layer.getX( ) ).toEqual( 180 );
        
        layer.compute( 0.1 );
        expect( layer.getX( ) ).toEqual( 20 );
    })

});