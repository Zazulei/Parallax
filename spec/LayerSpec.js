describe("Layer", function() {

    beforeEach(function() {

    });

    it("Create layer", function() {
        var layer = new Layer( );
        layer.setWidth( 100 );
        layer.calculeOffSet( 50 );
        expect( layer.getOffSet( ) ).toEqual( 50 );
    });

});