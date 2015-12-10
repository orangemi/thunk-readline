'use strict'

function ReadLine (stream, options) {
  if (!(this instanceof ReadLine)) return new ReadLine(stream, options)
  options = options || {}
  this.stream = stream
  this.lines = []
  this.lineFragment = ''
  this.isEnd = false
  this.seperator = options.seperator || /(?:\n|\r\n|\r)/g
  this.callback = null
  this.start()
}

ReadLine.prototype.start = function () {
  var self = this

  self.stream.on('data', function (chunk) {
    self.stream.pause()
    self.lines = self.lines.concat(chunk.toString().split(self.seperator))
    self.lines[0] = self.lineFragment + self.lines[0]
    self.lineFragment = self.lines.pop() || ''
    if (self.callback) self.nextLine(self.callback)
  })

  self.stream.on('end', function () {
    self.isEnd = true
    self.lines.push(self.lineFragment)
    if (self.callback) self.nextLine(self.callback)
  })
}

ReadLine.prototype.nextLine = function (callback) {
  var self = this
  if (self.lines.length) {
    var line = self.lines.shift()
    if (self.callback) {
      self.callback = null
    }
    process.nextTick(function () {
      callback(null, line)
    })
  } else if (!self.isEnd && !self.lines.length) {
    self.callback = callback
    self.stream.resume()
    return
  } else {
    callback(null, null)
  }
}

module.exports = ReadLine
