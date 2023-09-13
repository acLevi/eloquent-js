// My solution
function reverseArray(array) {
  let newArray = [];
  for (let value of array) newArray.unshift(value);
  return newArray;
}

function reverseArrayInPlace(array) {
  let { length } = array;
  for (let i = 0; i <= Math.floor(length / 2); i++) {
    [array[i], array[length - 1 - i]] = [array[length - 1 - i], array[i]];
  }
  return array;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

// Book solution
function reverseArray_(array) {
    let output = [];
    for (let i = array.length - 1; i >= 0; i--) {
      output.push(array[i]);
    }
    return output;
  }
  
  function reverseArrayInPlace_(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
      let old = array[i];
      array[i] = array[array.length - 1 - i];
      array[array.length - 1 - i] = old;
    }
    return array;
  }