function ExampleController()
{
    this.helloWorld = function()
    {
        //alert('Hello World');
        
        BT.get({
            url: 'sample.ajax.html',
            params: {},
            success: function(pstrData) {
                $('.container').html(pstrData);
            }
        });
    }
}