require('babel/polyfill');

var fs = require('fs');
var babel = require('babel');
var istanbul = require('istanbul');
var COV_VAR = '______coverage______';

var instrumenter = new istanbul.Instrumenter({
    coverageVariable: COV_VAR
});

require.extensions['.js'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});

    if (!filename.match(/(node_modules)/)) {
        src = babel.transform(src, {sourceMaps: 'inline', filename: filename}).code;
        if (!filename.match(/(.*_test\.js$|polyfills)/)) {
            src = instrumenter.instrumentSync(src, filename);
        }
    }

    module._compile(src, filename);
};

process.on('exit', function() {
    var collector = new istanbul.Collector();
    var reporter = new istanbul.Reporter();

    collector.add(global[COV_VAR]);

    reporter.add('json');
    reporter.add('lcov');

    reporter.write(collector, true, function() {
        console.log('DONE');
    });
});
