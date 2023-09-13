// My solution
function deepEqual(object1, object2) {
  if (object1 === object2) return true;

  if (
    !(typeof object1 === "object" && object1 != null) ||
    !(typeof object2 === "object" && object2 != null)
  )
    return false;

  if (Object.keys(object1).length != Object.keys(object2).length) return false;

  for (let key in object1) return deepEqual(object1[key], object2[key]);

  return true;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// -> true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// -> false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// -> true

// Book solution
function deepEqual_(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != "object" || b == null || typeof b != "object")
    return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual_(a[key], b[key])) return false;
  }

  return true;
}
