var fs = require("fs"),
    path = require("path"),
    _ = require("lodash");

function buildLoader(name, filenames) {
    return function() {
        var obj = {};
        for (var i = 0; i < filenames.length; i++) {
            var ext = path.extname(filenames[i]);
            if (ext == ".json") {
                _.extend(obj, JSON.parse(fs.readFileSync(filenames[i], 'utf8')));
            } else {
                _.extend(obj, require(filenames[i]));
            }
        }
        return obj;
    };
}

function loadDeps(dir, deps) {
    fs.readdirSync(dir).forEach(function(filename) {
        var ext = path.extname(filename);
        if (ext != ".json" && ext != ".js") {
            return;
        }
        var name = path.basename(filename, ext);
        if (!deps[name]) {
            deps[name] = [];
        }
        deps[name].push(path.join(dir, filename));
    });
}

module.exports = function(dir, options) {
    
    var fixtures = {};
    
    options = _.defaults(options || {}, {
        envVar: "NODE_ENV",
        dependencies: {}
    });

    var stats = fs.statSync(dir);
    
    if (!stats.isDirectory()) {
        throw "Cannot create fixtures: " + dir + " is not a directory";
    }
    
    var env = process.env[options.envVar];
    var envdirs = [];

    if (options.dependencies[env]) {
        envdirs.push(path.join(dir, options.dependencies[env]));
    }
    if (env) {
        envdirs.push(path.join(dir, env));
    }

    var bdir = dir;
    var deps = {};

    loadDeps(dir, deps);
    
    envdirs.forEach(function(envdir) {
        if (fs.existsSync(envdir) && fs.statSync(envdir).isDirectory()) {
            loadDeps(envdir, deps);
        }
    });

    for (var name in deps) {
        fixtures.__defineGetter__(name, buildLoader(name, deps[name]));
    }

    fixtures.options = function() {
        return options;
    };

    return fixtures;
};
