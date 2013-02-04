## Master branch

### Improvements
* Fixed serious flaw preventing last matches from being triggered properly.
* Speeded up regular expression matching for returning matches.

## Version 2.0.0 (Feb 1st 2013)
Major rewrite in order to bring support for firstMatch and noMatch callbacks.

### New features
* added `firstMatch` callback
* added `noMatch` callback
* brand new demo page
* regular expression group matching

### Improvements
* mass bind now triggers rule change

### Breaking changes
* New `rules` object is used instead of the old callback function 
* `$.fn.Hashtag('bind', pattern, rules)`
* `$.fn.Hashtag()` expects json object on format `pattern : rules`
* Regular expression group is returned instead of raw hashtag

## Version 1.0.0 (Sep 26th 2012)

First official version of the jQuery.Hashtag plugin.

### Features
* Mass binding rules
* Easy API functions
* Selectively unbindingin
* Trigger hashtag change
* Support for regular expression matching