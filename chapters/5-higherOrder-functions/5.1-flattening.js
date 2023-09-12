// My solution
var arrays = [[1, 2, 3], [4, 5], [6]];

console.log(
  arrays.reduce(function (array, arr) {
    return array.concat(arr);
  })
);

// -> [1, 2, 3, 4, 5, 6]

// Book solution
console.log(
  arrays.reduce(function (flat, current) {
    return flat.concat(current);
  }, [])
);
