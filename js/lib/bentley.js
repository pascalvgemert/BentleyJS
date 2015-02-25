/*

Copyright (C) 2014 by Pascal van Gemert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

/**
 * WELCOME TO BENTLEY  JS 
 *
 * BentleyJS is a server side rendering / hybrid minimalistic Javascript framework
 */
function BentleyJS()
{
	var self	 	 = this;
	var loaderHtml	 = '<div class="loader">Loading..</div>'; // ?
	
	self.appScope 	 = null;
	self.controllers = {};

	function __construct()
	{
		self.appScope = $('[bt_app]:first');
		
		//loadControllers();
		initialize();
		
		//triggerEvent('ready');
	}	
	
	function initialize()
	{
    	applyEvents('click');
    	applyEvents('change');
		applyFilters();
	}
	
	this.refresh = function()
	{
    	applyEvents('click');
    	applyEvents('change');
		applyFilters();
	}

    this.get = function(poParams)
	{
		if(poParams.url === undefined)
		{
			return false;
		}
		
		$.ajax({
			data: 	 (typeof poParams.params == 'object') ? poParams.params : {},
			url: 	 poParams.url,
			type: 	 'post',
			success: function(pstrData) 
			{
				if(typeof(poParams.success) == 'function')
	            {
	                poParams.success(pstrData);
	            }
	        },
	        error:   function(poXMLHttpRequest, pstrTextStatus, pstrErrorThrown)
            {
				if(typeof(poParams.failed) == 'function')
                {
					poParams.failed({ message: pstrErrorThrown });
				}
            }
		});
	}
	
	/**
	 * Set loader HTML
	 *
	 * @param string pstrHtml
	 */
	this.setLoaderHtml = function(pstrHtml)
	{
		loaderHtml = pstrHtml;
	}
	
	/**
	 * Show loader HTML in given container selector
	 *
	 * @param string pstrContainer
	 */
	this.showLoader = function(pstrContainer, pstrPosition)
	{
		switch(pstrPosition)
		{
			case 'append': 
				$(pstrContainer).append(loaderHtml); 
				break;
			case 'prepend': 
				$(pstrContainer).prepend(loaderHtml); 
				break;
			default: 
				$(pstrContainer).html(loaderHtml); 
				break;
		}
	}
	
	/**
	 * Applies the given event inside the app scope
	 */
	function applyEvents(pstrEvent)
	{
		self.appScope.find('[bt_'+ pstrEvent +']').each(function()
		{
			$(this).off(pstrEvent);
			$(this).on(pstrEvent, function(e)
			{
				var loElement		= $(this);
				var lstrExpression  = $(this).attr('bt_click');
				
				try 
				{
    				// require controller
    				var lstrControllerName 	= escapeBeforeEval($(this).parents('[bt_controller]:first').attr('bt_controller'));
    				
    				require(['controller/' + lstrControllerName + '.class'], function(poClass)
    				{
        				var loControllerClass = window[lstrControllerName];
        				var loController      = new loControllerClass();
        				
        				if(lstrExpression.indexOf('()') == -1)
    					{
    						return eval('loController.' + escapeBeforeEval(lstrExpression) + '(loElement, e);');
    					}
    				
    					return eval('loController.' + escapeBeforeEval(lstrExpression));
    				});
				} 
				catch(poError) 
				{ 
					console.log(lstrExpression + ' not exists in controller: ');
					console.log(poError);
					console.log(loController);
				}
			});
		});
	}
	
	function applyFilters()
	{
		self.appScope.find('[bt_filter]').each(function()
		{
			var lstrFilterSelector = $(this).attr('bt_filter');
			
			$(this).off('keyup');
			$(this).on('keyup', function(e)
			{
				var lstrFilterValue = $(this).val();
				
				self.appScope.find(lstrFilterSelector).each(function()
				{
					if($(this).text().toLowerCase().indexOf(lstrFilterValue.toLowerCase()) != -1)
					{
						$(this).show();
					}
					else 
					{
						$(this).hide();
					}
				});
				
				if(self.appScope.find(lstrFilterSelector + ':visible').length > 0) 
				{
					self.appScope.find(lstrFilterSelector + '.no-filter-result').hide();
				}
				else
				{
					self.appScope.find(lstrFilterSelector + '.no-filter-result').show();
				}
			});	
		});
	}
	
	/**
	 * Escape string for eval, to not get evil
	 *
	 * @param string pstrValueToEscape
	 * @return string
	 */
	function escapeBeforeEval(pstrValueToEscape)
	{
		return pstrValueToEscape.replace(/['"+]/, ''); // /^[\w+]$/
	}
	
	$(function() //$(document).ready(function()
	{
		__construct();
	})
}

// var BT = new BentleyJS();'use strict';