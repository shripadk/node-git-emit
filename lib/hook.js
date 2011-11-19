module.exports = function (hookName, opts, finish) {
    return new Hook(hookName, opts, finish);
};

function Hook (name, opts, finish) {
    this.name = name;
    this.finish = finish;
    this.arguments = opts.arguments;
    this.lines = opts.lines;
}

Hook.prototype.accept = function () {
    this.finish(true);
};

Hook.prototype.reject = function () {
    this.finish(false);
};
