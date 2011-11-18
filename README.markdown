git-emit
========

Expose git hooks as a single node.js EventEmitter.

COMING SOON.

example
=======

``` js
var em = require('git-emit')(__dirname + '/repo');

em.on('pre-commit', function (ok) {
    ok(Math.random() > 0.5); // randomly reject 50% of commits
});
```
