let ANCESTRY_FILE = require("./ancestry.js");

let ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

// My solution

function hasKnowMother(person) {
  return byName[person.mother] != null;
}

function ageDiff(person) {
  return person.born - byName[person.mother].born;
}

let byName = {};
ancestry.forEach(function (person) {
  byName[person.name] = person;
});

let diffs = ancestry.filter(hasKnowMother).map(ageDiff);

console.log(average(diffs));
// -> 31.2

// Book solution
var differences = ancestry.filter(function(person) {
    return byName[person.mother] != null;
  }).map(function(person) {
    return person.born - byName[person.mother].born;
  });