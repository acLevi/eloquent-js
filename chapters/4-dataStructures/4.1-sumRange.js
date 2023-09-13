// My solution
function range(start, end, increment = start < end ? 1 : -1) {
  let array = [];
  for (let i = start; start > end ? i >= end : i <= end; i += increment) {
    array.push(i)
  }
  return array;
}

function sum(array) {
  let sum = 0;
  for (let value of array) sum += value;
  return sum
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// Book solution
function range_(start, end, step = start < end ? 1 : -1) {
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

function sum_(array) {
  let total = 0;
  for (let value of array) {
    total += value;
  }
  return total;
}