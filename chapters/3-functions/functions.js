// who came first?
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}

// console.log(chicken() + "came first.");

// Closure
function wrapValue(n) {
  var localVariable = n;
  return function () {
    return localVariable;
  };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
// console.log(wrap1()); // -> 1
// console.log(wrap2()); // -> 2

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

var twice = multiplier(2);
// console.log(twice(5)); // -> 10

// Recursion
function power(base, exponent) {
  if (exponent == 0) return 1;
  else return base * power(base, exponent - 1);
}

// console.log(power(2, 3)); // -> 8

function findSolution(target) {
  function find(start, history) {
    if (start == target) {
      return history;
    } else if (start > target) {
      return null;
    } else {
      return (
        find(start + 5, "(" + history + "+ 5)") ||
        find(start * 3, "(" + history + " * 3)")
      );
    }
  }
  return find(1, "1");
}

// console.log(findSolution(24)); // -> (((1 * 3) + 5) * 3)

// Ascending functions
function printFarmInventory(cows, chickens) {
  var cowString = String(cows);
  while (cowString.length < 3) {
    cowString = "0" + cowString;
  }
  console.log(cowString + " Cows");
  var chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }
  console.log(chickenString + " Chickens");
}
// printFarmInventory(7, 11);

function printZeroPaddedWithLabel(number, label) {
  var numberString = String(number);
  while (numberString.length < 3) {
    numberString = "0" + numberString;
  }
  console.log(number + " " + label);
}

function printFarmInventory_(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickes");
  printZeroPaddedWithLabel(pigs, "Pigs");
}
// printFarmInventory(7, 11, 3);

function zeroPad(number, width) {
  var string = String(number);
  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}
function printFarmInventory(cows, chickens, pigs) {
    console.log(zeroPad(cows, 3) + " Cows");
    console.log(zeroPad(chickens, 3) + " Chickens");
    console.log(zeroPad(pigs, 3) + " Pigs");
}
printFarmInventory(7, 16, 3);
