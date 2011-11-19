#!/usr/bin/env node
process.on('uncaughtException', function (err) {
    console.error(err && err.stack || err);
    process.exit(1);
});

var fs = require('fs');
var path = require('path');
var hookDir = path.dirname(process.argv[1]);

var dnode = require('dnode');
var port = parseInt(fs.readFileSync(hookDir + '/.git-emit.port', 'utf8'));

var hookName = path.basename(process.argv[1]);
dnode.connect(port, function (remote, conn) {
    remote.emit(hookName, process.argv.slice(2));
});
