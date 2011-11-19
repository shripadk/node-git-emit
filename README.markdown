git-emit
========

Expose git hooks through an EventEmitter.

example
=======

reject.js
---------

``` js
// randomly reject 50% of commits
var em = require('git-emit')(__dirname + '/repo.git');

em.on('update', function (update) {
    if (Math.random() > 0.5) update.reject()
    else update.accept()
});
```

Now we can create a new bare repo and run reject.js to listen for commits:

```
$ git init --bare repo.git
Initialized empty Git repository in /home/substack/projects/node-git-emit/example/repo.git/
$ node reject.js
```

The first time, our commit is rejected:

```
$ git push ~/projects/node-git-emit/example/repo.git master
Counting objects: 43, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (36/36), done.
Writing objects: 100% (43/43), 6.15 KiB, done.
Total 43 (delta 18), reused 0 (delta 0)
Unpacking objects: 100% (43/43), done.
remote: error: hook declined to update refs/heads/master
To example/repo.git
 ! [remote rejected] master -> master (hook declined)
error: failed to push some refs to 'example/repo.git'
```
but the second time, the commit goes through!

```
$ git push ~/projects/node-git-emit/example/repo.git master
Counting objects: 43, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (36/36), done.
Writing objects: 100% (43/43), 6.15 KiB, done.
Total 43 (delta 18), reused 0 (delta 0)
Unpacking objects: 100% (43/43), done.
To example/repo.git
 * [new branch]      master -> master
```

It works as expected hooray!

methods
=======
