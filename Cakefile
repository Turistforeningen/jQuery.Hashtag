fs        = require "fs"
sys       = require "sys"

{spawn, exec} = require 'child_process'

_config =
  coffee:
    src			: 'src/'
    out			: 'dist/jQuery.hashtag.js'
    opts    : '--compile --join'
  uglifyjs:
    opts    : "-c" # -m - r '$'
  jshint:
    opts:
      # enforcing
      camelcase : on
      curly   : on
      eqeqeq  : on
      noempty : on
      nonew   : on
      undef   : on
      unused  : on
      strict  : on
      trailing : on
      
      # relxing
      eqnull	: on

      # environments
      jquery	: on
      devel		: on
      browser	: on
    glob:	{}	# global variables

options = # These will get overwritten by the commandline
  compress    : no
  verbose		  : no
  watch		    : no

coffeeWatchFn = {}

option '-x', '--compress', 'Compressed output'
option '-v', '--validate', 'JSHint validation'
option '-d', '--verbose',  'Verbose debug output'
option '-w', '--watch',    'Watch files for changes and recompile'

task 'compile', 'Compile source files..', (opts) ->
  options.extend opts
  coffeeCompile _config.coffee.src, _config.coffee.out
  coffeeWatch _config.coffee.src if options.watch

#
# Coffee: Step 1 - Compile
#
coffeeCompile = (src, out, callback) ->
  opts  = _config.coffee.opts
  
  debug 'CoffeeScript: compiling...'
  child = exec "coffee #{opts} #{out} #{src}", (error, stdout, stderr) ->    
    if stderr
      debug 'CoffeeScript: compile failed!', true, stderr
    else
      debug 'CoffeeScript: finished!'
      coffeeValidate out, callback

#
# Coffee: Step 2 - Validate
#
# @url - https://github.com/jshint/jshint
#
# @todo: better error parsing
#
coffeeValidate = (src, callback) ->
  if options.validate
    jshint = require("jshint").JSHINT
    debug 'JSHint: validating...'
    fs.readFile src, 'utf8', (err, data) ->
      if jshint data, _config.jshint.opts, _config.jshint.glob
        debug 'JSHInt: validation passed!'
        coffeeCompress src, callback
      else
    	  debug 'JSHInt: validation failed!', true, jshint.errors
  else
    coffeeCompress src, callback

#
# Coffee: Step 3 - Compress
#
# @todo: calculate file size difference
#
coffeeCompress = (src, callback) ->
  if options.compress
    debug 'UglifyJS: compressing...'
    opts = "-o #{src} #{_config.uglifyjs.opts}"
    child = exec "uglifyjs #{src} #{opts}", (error, stdout, stderr) ->
      if stderr
        debug 'UglifyJS: compression failed!', true, stderr
      else
        debug 'UglifyJS: compression completed!'
        if typeof callback is 'function'
          callback src
        else
          debug "#{src} compiled", true
  else if typeof callback is 'function'
    callback src
  else
    debug "#{src} compiled", true

#
# Coffee: Step 4 - Watch
#
coffeeWatch = (src, callback) ->
  watchr = require 'watchr'
  
  if src.endsWith '.coffee'
    coffeeWatchFn[src] = callback
  
  debug "JS: watching #{src}"
  watchr.watch
    path      : src
    listener  : (changeType, filePath) ->
      debug "#{filePath} [#{changeType}]"
      if filePath.endsWith '.coffee'
        if coffeeWatchFn[filePath]
          coffeeCompile filePath, coffeeWatchFn[filePath]
        else
          coffeeCompile _config.coffee.src, _config.coffee.out

# Get now time
now = ->
  time = new Date()
  
  h = time.getHours()
  m = time.getMinutes()
  s = time.getSeconds()
  
  h = "0#{h}" if h < 10
  m = "0#{m}" if m < 10
  s = "0#{s}" if s < 10
  
  "#{h}:#{m}:#{s}"

# Debug function
debug = (msg, force, details) ->
  if typeof force isnt 'undefined' or options.verbose
    console.log "#{now()} #{msg}"
    console.log details if typeof details isnt 'undefined'

# Helpers functions
String::endsWith = (str) -> this.substr(this.length - str.length) is str
Array::last = -> this[this.length -1]
Array::implode = (sep) -> this.toString().replace ',', sep
Object::extend = (obj) ->
  org = this
  Object.keys(obj).forEach (key) ->
    prop = Object.getOwnPropertyDescriptor obj, key
    Object.defineProperty org, key, prop
  this