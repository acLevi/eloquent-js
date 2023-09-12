let ANCESTRY_FILE = require("./ancestry.js");

function logEach(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

function forEach(array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i]);
  }
}

var numbers = [1, 2, 3, 4, 5],
  sum = 0;
forEach(numbers, function (number) {
  sum += number;
});

function greatherThan(n) {
  return function (m) {
    return m > n;
  };
}
var greatherThan10 = greatherThan(10);

function noisy(f) {
  return function (arg) {
    console.log("calling with", arg);
    var val = f(arg);
    console.log("called with", arg, "- got", val);
    return val;
  };
}

function unless(test, then) {
  if (!test) then();
}
function repeat(times, body) {
  for (let i = 0; i < times; i++) body(i);
}

repeat(3, function (n) {
  unless(n % 2, function () {
    // console.log(n, "is even");
  });
});

function tranparentWrapping(f) {
  return function () {
    return f.apply(null, arguments);
  };
}

var ancestry = JSON.parse(ANCESTRY_FILE);
// console.log(ancestry.length);

// function filter(array, test) {
//   var passed = [];
//   for (var i = 0; i < array.length; i++) {
//     if (test(array[i])) {
//       passed.push(array[i]);
//     }
//   }
//   return passed;
// }

// console.log(filter(ancestry, function(person) {
//   return person.born > 1900 && person.born < 1925;
// }));

// console.log(ancestry.filter(function(person) {
//   return person.father == "Carel Haverbeke";
// }));

function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++) {
    mapped.push(transform(array[i]));
  }
  return mapped;
}

var overNinety = ancestry.filter(function (person) {
  return person.died - person.born > 90;
});

console.log(
  map(overNinety, function (person) {
    return person.name;
  })
);

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++) {
    current = combine(current, array[i]);
  }
  return current;
}

// console.log(reduce([1, 2, 3, 4], function(a, b) {
//   return a + b;
// }, 0));

console.log(
  ancestry.reduce(function (min, cur) {
    if (cur.born < min.born) return cur;
    else return min;
  })
);

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

function age(p) {
  return p.died - p.born;
}
function male(p) {
  return p.sex == "m";
}
function female(p) {
  return p.sex == "f";
}

console.log(average(ancestry.filter(male).map(age)));
// -> 61.67
console.log(average(ancestry.filter(female).map(age)));
// -> 54.56

var byName = {};
ancestry.forEach(function (person) {
  byName[person.name] = person;
});

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null) {
      return defaultValue;
    } else {
      return f(
        person,
        valueFor(byName[person.mother]),
        valueFor(byName[person.father])
      );
    }
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke") {
    return 1;
  } else {
    return (fromMother + fromFather) / 2;
  }
}
var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

function countAncestors(person, test) {
  function combine(current, fromMother, fromFather) {
    var thisOneCounts = current != person && test(current);
    return fromMother + fromFather + (thisOneCounts ? 1 : 0);
  }
  return reduceAncestors(person, combine, 0);
}
function longLivingPercentage(person) {
  var all = countAncestors(person, function (person) {
    return true;
  });
  var longLiving = countAncestors(person, function (person) {
    return person.died - person.born >= 70;
  });
  return longLiving / all;
}
console.log(longLivingPercentage(byName["Emile Haverbeke"]));

var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];
function isInSet(set, person) {
  return set.indexOf(person.name) > -1;
}

// console.log(ancestry.filter(function(person) {
//   return isInSet(theSet, person);
// }));

console.log(ancestry.filter(isInSet.bind(null, theSet)));
