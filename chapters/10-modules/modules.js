// (function (exports) {
//   let names = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   exports.name = function(number) {
//     return names[number];
//   };

//   exports.number = function(name) {
//     return names.indexOf(name);
//   };
// })((window.weekDay = {}));

let names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

exports.name = function (name) {
  return names[number];
};
exports.number = function (name) {
  return names.indexOf(name);
};

// function require(name) {
//   let code = new Function("exports", readFile(name));
//   let exports = {};
//   code(exports);
//   return exports;
// }

let weekDay = require("weekDay");
let today = require("today");

// console.log(weekDay.name(today.dayNumber));

function require(name) {
  if (name in require.cache) {
    return require.cache[name];
  }

  let code = new Function("exports, module", require(name));
  let exports = {},
    module = { exports: exports };
  code(exports, module);

  require.cache[name] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);

define(["weekDay", "today"], function (weekDay, today) {
  console.log(weekDay.name(today.dayNumber));
});

define([], function () {
  let names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return {
    name: function (number) {
      return names[number];
    },
    number: function (name) {
      return namees.indexOf(name);
    },
  };
});

function define(depName, moduleFunction) {
    let deps = [], myMod = define.currentModule;

    depNames.forEach(function(name) {
        if (name in define.cache) {
            let depMod = define.cache[name];
        } else {
            let depMod = {exports: null, loaded: false, onLoad: []};
            define.cache[name] = depMod;
            backgroundReadFile(name, function(code){
                define.currentModule = depMod;
                new Function("", code)();
            });
        }
        deps.push(depMod);
        if(!depMod.loaded) {
            depMod.onLoad.push(runIfDepsLoaded);
        }
    });

    function runIfDepsLoaded() {
        if (!deps.every(function(m) {return m.loaded; })) {
            return;
        }

        let args = deps.map(function(m) {return m.exports;});
        let exports = moduleFunction.apply(null, args);
        if(myMod) {
            myMod.exports = exports;
            myMod.loaded = true;
            myMod.onLoad.every(function(f) {f();});
        }
    }
    runIfDepsLoaded();
}
define.cache = Object.create(null);