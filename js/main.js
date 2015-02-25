requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        controller: '../controller'
    }
});

var BT;

require(['jquery.min', 'bentley'], function( $ ) {
    BT = new BentleyJS();
});
