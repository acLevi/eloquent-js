function canYouSpotTheProblem() {
    "use strict";
    for (counter = 0; counter < 10; counter++) {
        console.log("happy happy");
    }
}

function Person(name) {this.name = name;}
let ferdinand = Person("Ferdinand"); // oops
// console.log(name);

function numberToSring(n, base) {
    let result = "", sign = "";
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        // console.log(n);
        result = String(n % base) + result;
        n = Math.floor(n / base);
    } while (n > 0);
    return sign + result;
}
// console.log(numberToSring(13, 2));

function promptNumber(question) {
    let result = Number(prompt(question, ""));
    if (isNaN(result)) return null;
    else return result;
}
console.log(promptNumber("How many trees do you see?"));