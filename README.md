jQuery.Hashtag 2.0
==================

Light weight Open Source jQuery plugin for binding functions to  in and out of URL hash-tags with support for regular expressions and mass bindings.

## Changelog

Changelog for latest changes to the plugin can be found here: https://github.com/Turistforeningen/jQuery.Hashtag/blob/master/README.md

## Examples
You can test out the working demo here: http://turistforeningen.github.com/jQuery.Hashtag/

### Bind Rule
This example triggers an alert whenever the hashtag `#hello-world` is set at the end of the browser URL.  
	
	$.fn.Hashtag('bind', 'hello-world', {
		'match' : function() { alert('Hello World'); }
	});
	
### Bind Rule (regexp)
The bind methods allows regular expressions as well as normal strings. The following example will trigger on all `hashtags` prefixed with `id-` and will return the regular expression group matched.

	$.fn.Hashtag('bind', 'id-([0-9]+)', {
		'match' : function(id) { alert('Your id is ' + id); }
	});

### match and noMatch
Both `match` and `stop` functions can be defined for hashtag rules. `match` is triggered when the hashtag first appears and `noMatch` is triggered when the hashtag is removed. For regular expression matching the `noMatch` function will only be triggered when the hashtag does no longer match the pattern.

	$.fn.Hashtag('bind', 'user-([0-9]+)', {
		'match' : function(id) { showUserInfo( id ); },
		'noMatch' : function() { hideUserInfo(); }
	});

### New and Old Tag
Just because we could we decided to return the old tag when the `match` and `noMatch` functions are triggered if you ever happen to need that.

	$.fn.Hashtag('bind', 'alert', {
		'match' : function(newTag, oldTag) { alert(oldTag + ' is gone, ' + newTag + ' is here!'); }
	});  

### Mas Bind Rules
Do you have a lot of rules? No, problem Hashtag can handle them all and it is as simple as one method call to set them all up.

	$.fn.Hashtag({
		'foo' : {
			'match': function() { alert('foo'); }
		},
		'bar' : {
			'match': function() { alert('bar'); }
		},
		'user-([0-9a-z]+)' : {
			'match': function(id) { /* something */ },
			'noMatch' : function() { /* something else */ }
		}
	});

### Unbind Rule
The unbind method allows you to remove function from a previously set `hashtag`. In this case, no function will be triggered for `#hello-world` if that was previously bound.
	
	$.fn.Hashtag('unbind', 'hello-world');
	
Alternatively all rules can be wiped by initializing the Hashtag from the start like this.

	$.fn.Hashtag({});  

### Set the URL Hashtag
For your convenience we have included a method for setting the hashtag, in case you forgot.

	$.fn.Hashtag('set', 'new-tag');
	
This is equivalent to the following, but maybe easier to remember.

	window.location.hash = 'new-tag';

## API

__$.fn.Hashtag(rules)__ *Mass bind Hashtag rules*

__$.fn.Hashtag('bind', pattern, rule)__ *Bind specific rule to specific hashtag pattern*

__$.fn.Hashtag('unbind', pattern)__ *Unbind specific hashtag pattern*

__$.fn.Hashtag('set', newTag)__ *Set the URL hashtag*

## What are Regular Expressions

> In computing, a regular expression is a specific pattern that provides concise and flexible means to "match" (specify and recognize) strings of text, such as particular characters, words, or patterns of characters. Common abbreviations for "regular expression" include regex and regexp.

A Javascript Regexp Tester and Cheat Sheet can be found [here](http://www.ninjavspenguin.com/regexp.html) if you are interested in learning more about regular expressions.

## Versioning
For transparency and insight into our release cycle, and for striving to maintain backward compatibility, jQuery.Hashtag will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit http://semver.org/.

## Requirements
 * jQuery 1.7