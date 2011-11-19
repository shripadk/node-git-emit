var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var dnode = require('dnode');
var seq = require('seq');

var allHooks = [
    'applypatch-msg',
    'pre-applypatch',
    'post-applypatch',
    'pre-commit',
    'prepare-commit-msg',
    'commit-msg',
    'post-commit',
    'pre-rebase',
    'post-checkout',
    'post-merge',
    'pre-receive',
    'update',
    'post-receive',
    'post-update',
    'pre-auto-gc',
    'post-rewrite',
];

var hookFile = __dirname + '/bin/hook.js';

module.exports = function (repoDir, cb) {
    var hookDir = path.resolve(repoDir) + '/hooks';
    var emitter = new EventEmitter;
    
    var port = Math.floor(Math.random() * ((1<<16) - 1e4) + 1e4);
    
    dnode(function (remote, conn) {
        this.emit = function () {
            console.dir([].slice.call(arguments));
        };
    }).listen(port);
    
    seq(allHooks)
        .seq(function () {
            fs.writeFile(hookDir + '/.git-emit.port', port.toString(), this);
        })
        .parEach_(function (next, name) {
            var file = hookDir + '/' + name;
            fs.lstat(file, function (err, s) {
                if (err && err.code === 'ENOENT') {
                    fs.symlink(hookFile, file, next)
                }
                else if (err) next(err)
                else if (s.isSymbolicLink()) next()
                else next('hook file already exists: ' + file)
            });
        })
        .seq(function () {
            if (cb) cb(null, emitter)
        })
        .catch(cb || console.error)
    ;
    
    return emitter;
};
