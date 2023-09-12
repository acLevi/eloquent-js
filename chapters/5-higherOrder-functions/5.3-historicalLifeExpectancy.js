let ANCESTRY_FILE = require("./ancestry.js");

let ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

//My solution

function byCentury(person) {
  return Math.ceil(person.died / 100);
}

function byAges(person) {
    return person.died - person.born
}

function groupBy(array, groupFunction, data = null) {
  let group = {};
  array.forEach((person) => {
    let groupOfThisPerson = groupFunction(person);
    if (!(groupOfThisPerson in group)) {
      group[groupOfThisPerson] = [person];
    } else {
      group[groupOfThisPerson].push(person);
    }
  });
  return group;
}

let centuryGroup = groupBy(ancestry, byCentury);
for (let key in centuryGroup) {
    let agesByCentury = centuryGroup[key].map(byAges)
    console.log(`${key}: ${average(agesByCentury)}`);
}

// Book solution

function groupBy_(array, groupOf) {
    var groups = {};
    array.forEach(function(element) {
      var groupName = groupOf(element);
      if (groupName in groups)
        groups[groupName].push(element);
      else
        groups[groupName] = [element];
    });
    return groups;
  }
  
  var byCentury_ = groupBy_(ancestry, function(person) {
    return Math.ceil(person.died / 100);
  });
  
  for (let century in byCentury_) {
    var ages = byCentury_[century].map(function(person) {
      return person.died - person.born;
    });
    // console.log(century + ": " + average(ages));
  }

