// test: no

(function () {
  "use strict";

  var active = null;

  function Animated(world) {
    this.world = world;
    var outer = window.__sandbox ? window.__sandbox.output.div : document.body,
      doc = outer.ownerDocument;
    var node = outer.appendChild(doc.createElement("div"));
    node.style.cssText =
      "position: relative; width: intrinsic; width: fit-content;";
    this.pre = node.appendChild(doc.createElement("pre"));
    this.pre.appendChild(doc.createTextNode(world.toString()));
    this.button = node.appendChild(doc.createElement("div"));
    this.button.style.cssText =
      "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
      "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
    this.button.innerHTML = "stop";
    var self = this;
    this.button.addEventListener("click", function () {
      self.clicked();
    });
    this.disabled = false;
    if (active) active.disable();
    active = this;
    this.interval = setInterval(function () {
      self.tick();
    }, 333);
  }

  Animated.prototype.clicked = function () {
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = "start";
    } else {
      var self = this;
      this.interval = setInterval(function () {
        self.tick();
      }, 333);
      this.button.innerHTML = "stop";
    }
  };

  Animated.prototype.tick = function () {
    this.world.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(
      this.pre.ownerDocument.createTextNode(this.world.toString())
    );
  };

  Animated.prototype.disable = function () {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = "Disabled";
    this.button.style.color = "red";
  };

  window.animateWorld = function (world) {
    new Animated(world);
  };
})();

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function (other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function (vector) {
  return (
    vector.x >= 0 &&
    vector.x < this.width &&
    vector.y >= 0 &&
    vector.y < this.height
  );
};
Grid.prototype.get = function (vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function (vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};

let directions = {
  n: new Vector(0, -1),
  ne: new Vector(1, -1),
  e: new Vector(1, 0),
  se: new Vector(1, 1),
  s: new Vector(0, 1),
  sw: new Vector(-1, 1),
  w: new Vector(-1, 0),
  nw: new Vector(-1, -1),
};

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

let directionsNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
  this.direction = randomElement(directionsNames);
}

BouncingCritter.prototype.act = function (view) {
  if (view.look(this.direction) != " ") {
    this.direction = view.find(" " || "s");
  }
  return { type: "move", direction: this.direction };
};

function elementFromChar(legend, ch) {
  if (ch == " ") {
    return null;
  }
  let element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function World(map, legend) {
  let grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function (line, y) {
    for (let x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    }
  });
}

function charFromElement(element) {
  if (element == null) {
    return " ";
  } else {
    return element.originChar;
  }
}

World.prototype.toString = function () {
  var output = "";
  for (let y = 0; y < this.grid.height; y++) {
    for (let x = 0; x < this.grid.width; x++) {
      let element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

function Wall() {}

Grid.prototype.forEach = function (f, context) {
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      let value = this.space[x + y * this.width];
      if (value != null) {
        f.call(context, value, new Vector(x, y));
      }
    }
  }
};

World.prototype.turn = function () {
  let acted = [];
  this.grid.forEach(function (critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function (critter, vector) {
  let action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    let dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function (action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    let dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest)) {
      return dest;
    }
  }
};

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

View.prototype.look = function (dir) {
  let target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target));
  } else {
    return "#";
  }
};
View.prototype.findAll = function (ch) {
  let found = [];
  for (let dir in directions) {
    if (this.look(dir) == ch) {
      found.push(dir);
    }
  }
  return found;
};
View.prototype.find = function (ch) {
  let found = this.findAll(ch);
  if (found.length === 0) return null;
  return randomElement(found);
};

// for (let i = 0; i < 5; i++) {
//   world.turn();
//   console.log(world.toString());
// }

function dirPlus(dir, n) {
  let index = directionsNames.indexOf(dir);
  return directionsNames[(index + n + 8) % 8];
}

function WallFollower() {
  this.dir = "s";
}

WallFollower.prototype.act = function (view) {
  let start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != " ") {
    start = this.dir = dirPlus(this.dir, -2);
  }
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return { type: "move", direction: this.dir };
};

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

let actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function (critter, vector) {
  let action = critter.act(new View(this, vector));
  let handled =
    action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter, vector, action);

  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0) {
      this.grid.set(vector, null);
    }
  }
};

actionTypes.grow = function (critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function (critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) {
    return false;
  }
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function (critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  let atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null) {
    return false;
  }
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function (critter, vector, action) {
  let baby = elementFromChar(this.legend, critter.originChar);
  let dest = this.checkDestination(action, vector);
  if (
    dest == null ||
    critter.energy <= 2 * baby.energy ||
    this.grid.get(dest) != null
  ) {
    return false;
  }
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function (context) {
  if (this.energy > 15) {
    let space = context.find(" ");
    if (space) {
      return { type: "reproduce", direction: space };
    }
    if (this.energy < 20) {
      return { type: "grow" };
    }
  }
};

function PlantEater() {
  this.energy = 20;
}
PlantEater.prototype.act = function (context) {
  let space = context.find(" ");
  if (this.energy > 60 && space) {
    return { type: "reproduce", direction: space };
  }
  let plant = context.find("*");
  if (plant) {
    return { type: "eat", direction: plant };
  }
  if (space) {
    return { type: "move", direction: space };
  }
};

//7.1 Artificial Stupidity
function SmartPlantEater() {
  this.energy = 30;
  this.direction = "e"
}
SmartPlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 90 && space) {
    return {type: "reproduce", direction: space};
  }
  let plants = view.findAll("*");
  if (plants.length > 1) {
    return {type: "eat", direction: randomElement(plants)};
  }
  if (view.look(this.direction) != " " && space) {
    this.direction = space;
  }
  return {type: "move", direction: this.direction}
};

// 7.2 Predators
function Tiger() {
  this.energy = 100;
  this.direction = "w";
  this.preySeen = [];
}
Tiger.prototype.act = function(view) {
  let seenPerTurn = this.preySeen.reduce(function(a, b) {
    return a + b;
  }, 0) / this.preySeen.length;
  let prey = view.findAll("O");
  this.preySeen.push(prey.length);
  if(this.preySeen.length > 6) {
    this.preySeen.shift();
  }
  if (prey.length && seenPerTurn > 0.25) {
    return {type: "eat", direction: randomElement(prey)};
  }
  let space = view.find(" ");
  if (this.energy > 400 && space) {
    return {type: "reproduce", direction: space};
  }
  if (view.look(this.direction) != " " && space) {
    this.direction = space;
  }
  return {type: "move", direction: this.direction};
};

animateWorld(new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": SmartPlantEater,
   "*": Plant}
));

