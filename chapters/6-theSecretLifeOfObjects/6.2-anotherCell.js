function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++) {
    result += string;
  }
  return result;
}

class TextCell {
  constructor(text) {
    this.text = text.split("\n");
  }

  minWidth() {
    return this.text.reduce((width, line) => {
      return Math.max(width, line.length);
    }, 0);
  }
  minHeight() {
    return this.text.length;
  }

  draw(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
      var line = this.text[i] || "";
      result.push(line + repeat(" ", width - line.length));
    }
    return result;
  }
}

// My solution

class StretchCell {
  constructor(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
  }

  minWidth() {
    return Math.max(this.width, this.inner.minWidth());
  }
  minHeight() {
    return Math.max(this.height, this.inner.minHeight());
  }
  draw(width, height) {
    return this.inner.draw(width, height);
  }
}

let sc = new StretchCell(new TextCell("abd"), 1, 2);
console.log(sc.minWidth());
// -> 3
console.log(sc.minHeight());
// -> 2
console.log(sc.draw(3, 2));
// -> ["abc", "   "]


// Book solution
function _StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
  }
  
  _StretchCell.prototype.minWidth = function() {
    return Math.max(this.width, this.inner.minWidth());
  };
  _StretchCell.prototype.minHeight = function() {
    return Math.max(this.height, this.inner.minHeight());
  };
  _StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
  };
