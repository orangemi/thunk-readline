# thunk-readline
=================

## Usage
```
var fs = require('fs')
var ReadLine = require('thunk-readline')
var reader = ReadLine(fs.createReadStream('./sample.log'))
reader.nextLine(function (err, line) {
  ...
})
```

## Generator Usage
```
var fs = require('fs')
var ReadLine = require('thunk-readline')
var reader = ReadLine(fs.createReadStream('./sample.log'))

while ((line = yield reader.nextLine()) !== null) {
  ...
}
```

## API
### ReadLine(readStream, options)
- readStream
- options
  - seperator: seperator string or Regular

### nextLine(callback)
- callback: function(error, line)
  - error: