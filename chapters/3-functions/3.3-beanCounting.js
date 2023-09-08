// My solution
function countingB(string) {
  string = String(string);
  let count = 0;
  for (let char of string) {
    if (char === "B") count++;
  }
  return count;
}

function countingChar(string, target) {
  string = String(string);
  let count = 0;
  for (let char of string) {
    if (char === String(target)) count++;
  }
  return count;
}

console.log(countingBean("BBC"));
// -> 2
console.log(countingChar("kakkerlak", "k"));
// -> 4

// Book solution
function countChar(string, ch) {
  let counted = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] == ch) {
      counted += 1;
    }
  }
  return counted;
}

function countBs(string) {
  return countChar(string, "B");
}
