var path = require('path');
var fs = require('fs');

var regex = /(\n?)([ \t]*)(<!--\s*replace:(\w+(?:-\w+)*)\s*-->)\n?([\s\S]*?)\n?(<!--\s*endreplace\s*-->)\n?/ig;

function regexMatchAll(string, regexp) {
  var matches = [];
  string.replace(regexp, function () {
    var arr = Array.prototype.slice.call(arguments);
    matches.push(arr);
  });
  return matches;
}

function Replace(config) {
  this.skip = config.skip || false;
  this.entry = config.entry;
  this.output = config.output;
  this.data = config.data;
  this.hash = config.hash;
  this.hashValue = config.hashValue;
}

Replace.prototype.apply = function (compiler) {
  var self = this;
  var folder = compiler.options.context;
  var entry = path.join(folder, self.entry);
  var output = path.join(folder, self.output);

  fs.readFile(entry, 'utf8', function (err, data) {
    if (!self.skip) {
      var matches = regexMatchAll(data, regex);
      matches.forEach(function (match) {
        var str = match[0];
        var key = match[4];
        data = data.replace(str, '\n' + self.data[key] + '\n');
      });
    }

    compiler.plugin('done', function (stats) {
      if (self.hash) {
        var reg = new RegExp('\\' + self.hash, 'g');
        var changeWith = typeof self.hashValue === 'string' ? self.hashValue : stats.hash;
        data = data.replace(reg, changeWith);
      }
      fs.writeFileSync(output, data);
    });
  });
};

module.exports = Replace;
