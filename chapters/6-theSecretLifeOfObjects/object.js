// var coelho = {};
// coelho.diz = function(linha) {
//     console.log("O coelho diz '" + linha + "'");
// };
// coelho.diz("Estou vivo.");

// function speak(line) {
//     console.log("The " + this.type + " rabbit says '" + line + "'");
// }
// var whiteRabbit = {type: "white", speak: speak};
// var fatRabbit = {type: "fat", speak: speak};

// whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
// fatRabbit.speak("I could sure use a carrot right now.")

// speak.apply(fatRabbit, ["Burp!"]);
// speak.call({type: "old"}, "Oh my.");

// var empty = {};
// console.log(empty.toString);
// console.log(empty.toString());

// console.log(Object.getPrototypeOf({}) == Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype));

// console.log(Object.getPrototypeOf(isNaN) == Function.prototype);
// console.log(Object.getPrototypeOf([]) == Array.prototype);

// var protoCoelho = {
//     fala: function(linha) {
//         console.log("O coelho " + this.tipo + " fala '" + linha + "'");
//     }
// }
// var coelhoAssasino = Object.create(protoCoelho);
// coelhoAssasino.tipo = "assasino";
// coelhoAssasino.fala("SKREEE!")

function Coelho(tipo) {
  this.tipo = tipo;
}

Coelho.prototype.fala = function (linha) {
  console.log("O coelho " + this.tipo + " fala '" + linha + "'");
};

var coelhoAssasino = new Coelho("assassino");
var coelhoPreto = new Coelho("preto");
coelhoPreto.fala("domm...");
