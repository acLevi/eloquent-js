var journal = require("./journal.js");

function addEntry(events, didITurnIntoASquirrel) {
  journal.push({
    events: events,
    squirrel: didITurnIntoASquirrel,
  });
}

/**
 * n00 = table[0] n10 = table[2]
 * n01 = table[1] n11 = table[3]
 */
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}

function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  for (var i = 0; i < journal.length; i++) {
    var entry = journal[i],
      index = 0;
    if (hasEvent(event, entry)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

function gatherCorrelations(journal) {
  var phis = {};
  for (let entry of journal) {
    let events = entry.events;
    for (let event of events) {
      if (!(event in phis)) {
        phis[event] = phi(tableFor(event, journal));
      }
    }
  }
  return phis;
}

var correlations = gatherCorrelations(journal);

for (var event in correlations) {
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ": " + correlation);
  }
}
console.log("----------------------------------");

for (var i = 0; i < journal.length; i++) {
  var entry = journal[i];
  if (hasEvent("peanuts", entry) && !hasEvent("brushed teeth", entry)) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", journal))); // gotcha!
