//My solution
function MultiplicationUnitFailure(message) {
  this.message = message;
  this.stack = new Error().stack;
}

MultiplicationUnitFailure.prototype = Object.create(Error.prototype);
MultiplicationUnitFailure.prototype.name = "Multiplication Failure";

function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
    throw new MultiplicationUnitFailure();
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    return reliableMultiply(a, b);
  }
}

console.log(reliableMultiply(8, 8));

// Book solution
// function reliableMultiply(a, b) {
//     for (;;) {
//       try {
//         return primitiveMultiply(a, b);
//       } catch (e) {
//         if (!(e instanceof MultiplicatorUnitFailure))
//           throw e;
//       }
//     }
//   }
