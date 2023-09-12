// My solution
function every(array, conditionFunc) {
  for (let value of array) {
    if (conditionFunc(value) == false) return false;
  }
  return true;
}

function some(array, conditionFunc) {
  for (let value of array) {
    if (conditionFunc(value) == true) return true;
  }
  return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
// -> true
console.log(every([NaN, NaN, 4], isNaN));
// -> false
console.log(some([NaN, 3, 4], isNaN));
// -> true
console.log(some([2, 3, 4], isNaN));
// -> false

// Book solution
function every_(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (!predicate(array[i])) return false;
  }
  return true;
}

function some_(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i])) return true;
  }
  return false;
}
