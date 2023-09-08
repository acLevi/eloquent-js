// My solution
function min(a, b) {
  return a < b ? a : b;
}

console.log(min(0, 10));
// -> 0
console.log(min(0, -10));
// -> 10

// Book solution
function min_(a, b) {
  if (a < b) return a;
  else return b;
}
