let expReg1 = new RegExp("abc");
let expReg2 = /abc/;

let umMaisUm = /1 \+ 1/;

// console.log(/abc/.test("abcde"));
// console.log(/abc/.test("12345"));

// console.log(/[0123456789]/.test("ano 1992"));
// console.log(/[0-9]/.test("ano 1992"));

let dataHora = /\d\d\/\d\d\/\d\d\d\d \d\d:\d\d/;
// console.log(dataHora.test("30/01/2003 15:20"));
// console.log(data.dataHora);

let naoBinario = /[^01]/;
// console.log(naoBinario.test("01101"));
// console.log(naoBinario.test("01201"));

// console.log(/'\d+'/.test("'123'"));
// console.log(/'\d+'/.test("''"));
// console.log(/'\d*'/.test("'123'"));
// console.log(/'\d*'/.test("''"));

let neighbor = /neighbou?r/;
// console.log(neighbor.test("neighbour"));
// console.log(neighbor.test("neighbor"));

// console.log(new Date);

// console.log(new Date(2014, 6, 29));
// console.log(new Date(1981, 6, 29, 18, 30, 50));

// console.log(new Date(2014, 2, 21).getTime());
// console.log(new Date(1395378000000));

function buscaData(string) {
  let dateTime = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
  let match = dateTime.exec(string);
  return new Date(Number(match[3]), Number(match[2]), Number(match[1]));
}

// console.log(buscaData("21/1/2014"));

let contagemAnimal = /\b\d+ (porco|vaca|galinha)s?\b/;
// console.log(contagemAnimal.test("15 porcos"));
// console.log(contagemAnimal.test("15 porcosgalinhas"));

// console.log("Borobudur".replace(/[ou]/, "a"));
// console.log("Borobudur".replace(/[ou]/g, "a"));

// console.log("Hopper, Grace\nMcCarthy, John\nRitchie, Dennis".replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));

let s = "the cia and fbi";
// console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
//     return str.toUpperCase();
// }));

let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
// console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

function stipComments(code) {
  return code.replace(/\/\/.*|\/\*[\w\W]*?\*\//g, "");
}
// console.log(stipComments("1 + /* 2 */3"));
// console.log(stipComments("x= 10; // ten!"));
// console.log(stipComments("1 /* a */+/* b */ 1"));

// let name = "harry";
// let text = "Harry is a suspicious character.";
// let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
// console.log(text.replace(regexp, "_$1_"));

// let name = "dea+hl[]rd";
// let text = "This dea+hl[]rd guy is quite annoying.";
// let escaped = name.replace(/[^\w\s]/g, "\\$&");
// let regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
// console.log(text.replace(regexp, "_$1_"));

function parseINI(texto) {
  let categorias = [];
  function novaCategoria(nome) {
    let categ = { nome: nome, fields: [] };
    categorias.push(categ);
    return categ;
  }
  let categoriaAtual = novaCategoria("TOP");

  texto.split(/\r?\n/).forEach(function(linha) {
    let encontrados;
    if (/^\s*(;.*)?$/.text(linha)) {
        return;
    } else if (encontrados = linha.encontrados(/^\[(.*)\]$/)) {
        categoriaAtual = novaCategoria(encontrados[1]);
    } else if (encontrados = linha.encontrados(/^(\w+)=(.*)$/)) {
        categoriaAtual.fields.push({nome: encontrados[1], value: encontrados[2]});
    } else {
        throw new Error("Linha '" + linha + "' is invalid.");
    }
    return categorias;
  });
}
