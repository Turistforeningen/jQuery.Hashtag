(function(){"use strict";$(window).on("hashchange",function(e){return $(this).Hashtag("trigger"),e.preventDefault(),e.stopPropagation(),!1}),jQuery(function($){var hash,history,last,methods,routs,stop;return routs={},history=[],stop=null,last={tag:"",regexp:null,rules:{}},Array.prototype.peek=function(){return this[this.length-1]},hash=function(){var tag;return tag=window.location.hash.replace("#",""),tag===void 0&&(tag=""),tag},methods={init:function(options){return null!=options&&$.extend(routs,options),this},trigger:function(tag){var isMatch;return null==tag&&(tag=hash()),isMatch=!1,$.each(routs,function(pattern,rules){var match,regexp;regexp=RegExp(pattern,"i"),match=regexp.exec(tag),null!=match&&(isMatch=!0,match[1]!==void 0&&(tag=match[1]),"function"==typeof last.rules.noMatch&&null!==last.regexp&&last.regexp.test(tag)&&last.rules.noMatch(tag,last.tag),"function"==typeof rules.match&&rules.match(tag,last.tag),last={tag:tag,regexp:regexp,rules:rules})}),isMatch||("function"==typeof last.rules.noMatch&&last.rules.noMatch(tag,last.tag),last={tag:tag,regexp:null,rules:{}}),this},goBack:function(){return stop=null,history.pop(),$.fn.Hashtag("set",history.pop())},set:function(tag){return window.location.hash=tag,this},bind:function(tag,opts){return routs[tag]=opts,$.fn.Hashtag("trigger"),this},unbind:function(tag){return routs[tag]=void 0,this}},$.fn.Hashtag=function(method){return null!=methods[method]?methods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?$.error("Method "+method+" does not exist on jQuery.Hashtag"):methods.init.apply(this,arguments)}})}).call(this);