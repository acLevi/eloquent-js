//My solution
function isEven(number) {
  if (number < 0) number *= -1; // -> avoid negative number rangerError
  if (number === 0) return true;
  else if (number === 1) return false;
  return isEven(number - 2);
}

console.log(isEven(50));
// -> true
console.log(isEven(75));
// -> false
console.log(isEven(-1));
// -> false

// Book solution
function isEven_(n) {
    if (n == 0) return true;
    else if (n == 1) return false;
    else if (n < 0) return isEven(-n);
    else return isEven(n - 2);
  }