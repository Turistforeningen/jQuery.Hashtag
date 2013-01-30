// Generated by CoffeeScript 1.4.0

/*
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
*/


(function() {
  "use strict";

  $(window).on('hashchange', function(e) {
    $(this).Hashtag('trigger');
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  jQuery(function($) {
    var hash, history, last, methods, routs, stop;
    routs = {};
    history = [];
    stop = null;
    last = {
      tag: '',
      regexp: null,
      rules: {}
    };
    Array.prototype.peek = function() {
      return this[this.length - 1];
    };
    hash = function() {
      var tag;
      tag = window.location.hash.replace('#', '');
      if (typeof tag === 'undefined') {
        tag = '';
      }
      return tag;
    };
    methods = {
      init: function(options) {
        if (options != null) {
          $.extend(routs, options);
        }
        $.fn.Hashtag('trigger');
        return this;
      },
      trigger: function(tag) {
        var match;
        if (tag == null) {
          tag = hash();
        }
        match = null;
        $.each(routs, function(pattern, rules) {
          var regexp;
          regexp = new RegExp(pattern, 'i');
          match = regexp.exec(tag);
          if (match != null) {
            if (typeof match[1] !== 'undefined') {
              tag = match[1];
            }
            if (typeof last.rules.noMatch === 'function') {
              last.rules.noMatch(tag, last.tag);
            }
            if (typeof rules.firstMatch === 'function') {
              rules.firstMatch(tag, last.tag);
            } else if (typeof rules.match === 'function') {
              rules.match(tag, last.tag);
            }
            last = {
              tag: tag,
              regexp: regexp,
              rules: rules
            };
          }
        });
        if (match === null) {
          if (typeof last.rules.noMatch === 'function') {
            last.rules.noMatch(tag, last.tag);
          }
          last = {
            tag: tag,
            regexp: null,
            rules: {}
          };
        }
        return this;
      },
      goBack: function() {
        stop = null;
        history.pop();
        return $.fn.Hashtag('set', history.pop());
      },
      set: function(tag) {
        window.location.hash = tag;
        return this;
      },
      bind: function(tag, opts) {
        routs[tag] = opts;
        $.fn.Hashtag('trigger');
        return this;
      },
      unbind: function(tag) {
        routs[tag] = void 0;
        return this;
      }
    };
    return $.fn.Hashtag = function(method) {
      if (methods[method] != null) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error('Method ' + method + ' does not exist on jQuery.Hashtag');
      }
    };
  });

}).call(this);
