###
 * jQuery Hashtag, a light weight hashtag function binding
 * utility for jQuery with support for regular expressions.
 *
 * Written by Hans Kristian Flaatten for Turistforeningen,
 * http://www.turistforeningen.no
 *
 * Version 1.0.0
 * Full source at https://github.com/Turistforeningen/jQuery.Hashtag
 * Copyright (c) 2012 Turistforeningen @  http://www.turistforeningen.com
 *
 * MIT License, https://github.com/Turistforeningen/jQuery.Hashtag/blob/master/LICENSE.md
 *
###

# jshint strict definition
"use strict"

# Trigger bounded function on hashchange
$(window).on 'hashchange', (e) ->
  $(this).Hashtag 'trigger'
  e.preventDefault() # prevent scrolling to top
  e.stopPropagation()
  false;

# Wrapp in jQuery
jQuery ($) ->
  routs = {}
  history = []
  stop = null
  
  Array::peek = -> this[this.length-1]  
  
  hash = ->
    tag = window.location.hash.replace '#', ''
    tag = '' if typeof tag is 'undefined'
    return tag
  
  methods =
    #
    # Init method
    #
    # Use this for mas set bounded functions to regular
    # expressions. 
    #
    init : ( options ) ->
      $.extend routs, options if options?
      this
    
    #
    # Trigger function for tag
    #
    # This manually triggers a function for a given tag
    #
    # @param tag - {@code String} tag to trigger for
    #
    # @return {@code this}
    #
    trigger : ( tag ) ->
      tag ?= hash()
      
      last = history.peek()
      history.push tag
      
      stop tag, last if typeof stop is 'function'
      stop = null
      
      $.each routs, ( pattern, rule ) ->
        regexp = new RegExp pattern, 'i'
        if regexp.test(tag)
          if typeof rule.stop is 'function'
            stop = rule.stop
          else
            stop = null
          rule.start tag, last if typeof rule.start is 'function'
          return # multi-matches?
          
      this
    
    #
    # Go back in history
    #
    goBack : ->
      stop = null
      history.pop()
      
      $.fn.Hashtag 'set', history.pop()
    
    #
    # Set Hashtag
    #
    # Use this to set the Hashtag in the URL
    #
    # @param tag - {@code String} tag to set
    #
    # @return {@code this}
    #
    set : ( tag ) ->
      window.location.hash = tag

      this
    
    #
    # Bind function to Hashtag expression
    #
    # Use this method to bind expression to a function 'fn'. 
    # The function will be triggered whenever the expression
    # is matched with the current Hashtag in the browser URL.
    #
    # @param tag - {@code Stirng} this can be a regular expression
    # @param opts - {@code Object} start and stop functions
    #
    # @return {@code this}
    #
    bind : ( tag, opts ) ->
      routs[tag] = opts
  
      $.fn.Hashtag 'trigger'
  
      this
      
    #
    # Unbind expression
    #
    # Use this to unbind a set exression if it is no longer needed.
    #
    # @param tag - {@code String} existing bound expression
    #
    # @return {@code this}
    #
    unbind : ( tag ) ->
      routs[tag] = undefined
      this
    
  # Method calling logic
  $.fn.Hashtag = ( method ) ->
    if methods[method]?
      methods[method].apply this, Array.prototype.slice.call( arguments, 1 )
    else if typeof method is "object" or not method
      methods.init.apply this, arguments
    else
      $.error 'Method ' +  method + ' does not exist on jQuery.Hashtag'