jQuery.Hashtag
==============

Open Source jQuery plugin for binding functions to URL hash-tags with support for regular expressions.

[Javascript Regexp Tester and Cheat Sheet](http://www.ninjavspenguin.com/regexp.html)

## Examples

### Bind
This example triggers an alert whenever `#hello-world` is at the end of the browser URL.  
	
	$.fn.Hashtag('bind', 'hello-world', function() {
		alert('Hello World');
	});
	
### Bind (regexp)
The bind methods allows regular expressions as well as normal strings. The following example will trigger on all `hashtags` prefixed with `id`.

	$.fn.Hashtag('bind', 'id-[0-9]+', function( tag ) {
		id = tag.replace('id-', '');
		alert('Your id is ' + id);
	})
	
### Mas Bind
The following will mass bind `hashtags` to a function.

	$.fn.Hashtag({
		'foo' : function() { alert('foo'); },
		'bar' : function() { alert('bar'); },
		'user-[0-9a-z]+' : function() { /* something */ } 
	});

### Unbind
The unbind method allows you to remove function from a previously set `hashtag`. In this case, no function will be triggered for `#hello-world` if that was previously bound.
	
	$.fn.Hashtag('unbind', 'hello-world')  

### Set URL hashtag
For your convenience we have included a method for setting the hashtag, in case you forgot.

	$.fn.Hashtag('set', 'new-tag');
	
This is equivalent to the following, but maybe easier to remember.

	window.location.hash = 'new-tag'

## Requirements
 * jQuery 1.7