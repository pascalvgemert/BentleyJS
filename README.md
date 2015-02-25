# BentleyJS
A lightweight declarative event binding framework build on JQuery. The best part of the Framework is that with RequireJS the controllers are lazy loaded and a minimum of resources are loaded on the first request. 

### Size
Uncompressed size: 4.07kb  
Minified size: 2.07kb  
GZipped size: 773b  

### Dependencies
* Jquery version 1.x
* RequireJS

### Define the Application
To define the application just add an attribute `bt_app="myapp"` to the HTML tag.

### Define a Controller
To define a controller add an attribute `bt_controller="MyControllerName"` to a DOM element of choice.
You also need to create a Controller in the `/js/controller/` directory, in this case `MyControllerName.class.js`

##### Sample of a controller file

``` js
function MyControllerName()
{
    this.helloWorld = function()
    {
        alert('Hello World');
    }
}
```

### Bind events
To bind an event add an attribute `bt_click="helloWorld"` to an DOM element inside the Controller DOM element.
The binding points to an public method in the Controller. (See example above)

##### Possible bindings
* click (`bt_click="method"`)
* change (`bt_change="method"`)

### HTML example:

``` html
<!DOCTYPE html>
<html bt_app="my_app">
    <head>
        <title>Page 1</title>
        <script data-main="js/main.js" src="js/lib/require.min.js"></script>
    </head>
    <body>
        <div bt_controller="ExampleController">
            <a href="javascript:void(0);" bt_click="helloWorld">Do Hello World</a>
            
            <div class="container"></div>
        </div>
    </body>
</html>
```

### Advanced

##### On Ready
BentleyJS has it's own Ready function.  
`BT.on('ready', function() { /* do something */ });`

##### Calling Controllers from other Controllers
To call a controller from another controller to reuse methods, you can use the `BT.controller('ControllerName')` method.  
You can also chain the method behind it. `BT.controller('ControllerName').method();`
