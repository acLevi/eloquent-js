// My solution
for (let n = 1; n <= 100; n++) {
  if (n % 5 == 0 && n % 3 == 0) console.log("FizzBuzz");
  else if (n % 3 == 0) console.log("Fizz");
  else if (n % 5 == 0) console.log("Buzz");
  else console.log(n);
}

// Book solution
for (let n = 1; n <= 100; n++) {
  let output = "";
  if (n % 3 == 0) output += "Fizz";
  if (n % 5 == 0) output += "Buzz";
  console.log(output || n);
}
