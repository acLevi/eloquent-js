// My solution
let str = "";
for (let i = 0; i < 7; i++) {
  str += "#";
  console.log(str);
}

// Book solution
for (let line = "#"; line.length < 8; line += "#") {
    console.log(line);
}