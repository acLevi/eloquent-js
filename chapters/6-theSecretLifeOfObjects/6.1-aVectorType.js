// My solution
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vector((this.x += vector.x), (this.y += vector.y));
  }
  minus(vector) {
    return new Vector((this.x -= vector.x), (this.y -= vector.y));
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5

// Book solution
function Vector_(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Vector_.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };
  
  Vector_.prototype.minus = function(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  };
  
  Object.defineProperty(Vector_.prototype, "length", {
    get: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  });