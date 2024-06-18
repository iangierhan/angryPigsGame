// Javascript Document
// Author : Ian Gierhan
// Date : 2023-04-03
// Program Angry Pigs

// Global variables
var canvasElem;
var world;

// When the window loads, initialize everything.
window.onload = initAll;

// Handles player movement based on key press events.
function movePlayer(e) {
  var player = world.getEntity("player");
  var ySpeed = 0;
  var maxYSpeed = 20;

  switch (e.keyCode) {
    case 32: // spacebar
      player.applyImpulse(500, 90);
      break;
    case 38: // up arrow
      ySpeed = Math.min(player._body.GetLinearVelocity().y + 1, maxYSpeed);
      player.setLinearVelocity(0, ySpeed);
      break;
    case 40: // down arrow
      ySpeed = Math.max(player._body.GetLinearVelocity().y - 1, -maxYSpeed);
      player.setLinearVelocity(0, ySpeed);
      break;
    default:
      break;
  }
}

// Initializes the game environment.
function initAll()  {
  console.log("initAll has started...");

  // Get the canvas element and create the game world.
  canvasElem = document.getElementById("game");
  world = boxbox.createWorld(canvasElem, {
    gravity: {x:0, y:0},
    scale: 15,
    collisionOutlines: false
  });

  // Create the player entity.
  world.createEntity({
    name: "player",
    image: "minionPig.png",
    radius: 1,
    density: 1,
    height: 7,
    width: 7,
    x: 5,
    y: 15,
    onKeyDown: function(e) {
      if (e.keyCode === 32) {
        // Spacebar
        kick.call(this);
      } else if (e.keyCode === 38) {
        // Arrow up
        this.applyImpulse(300, 45);
      } else if (e.keyCode === 40) {
        // Arrow down
        this.applyImpulse(300, 135);
      }
    }
  });
  
// Define and create block entities at specified positions.
  var block = {
    name: "block",
    image: "pin.png",
    width: "0.5",
    height: "6",
    onImpact: impact
  };

  world.createEntity(block, {x: 59, y: 14});
  world.createEntity(block, {x: 66, y: 18});
  world.createEntity(block, {x: 66, y: 10});
  world.createEntity(block, {x: 73, y: 14});
  world.createEntity(block, {x: 73, y: 22});
  world.createEntity(block, {x: 73, y: 6});
  world.createEntity(block, {x: 80, y: 18});
  world.createEntity(block, {x: 80, y: 10});
  world.createEntity(block, {x: 80, y: 2});
  world.createEntity(block, {x: 80, y: 26});
}

// Applies a random impulse to the player.
function kick() {
  var impulse;
  var degree;

  impulse = (Math.random() * 300) + 300;
  degree = (Math.random() * 10) + 78;

  this.applyImpulse(impulse, degree);
}

var score = 0;
var soundPlayed = false;

// Define a set to keep track of which blocks have been hit
var hitBlocks = new Set();

// Handles impact events between entities.
// function impact(entity) {
//   if (entity.name() == "player") {
//     if (!soundPlayed) {
//       var sound = new Audio("strike.mp3");
//       sound.play();
//       soundPlayed = true;
//     }
//   } else if (entity.name() == "block") {
//     // Check if the block has not been hit before
//     if (!hitBlocks.has(entity)) {
//       hitBlocks.add(entity); // Add the block to the set of hit blocks
//       score += 1;
//     }
//   }

//   // Update the score display
//   var scoreTextElement = document.getElementById("txtScore");
//   scoreTextElement.innerText = "Score: " + score + " Pins";
// }
function impact(entity) {
  if (entity.name() == "player") {
    if (!soundPlayed) {
      var sound = new Audio("strike.mp3");
      sound.play();
      soundPlayed = true;
    }
  } else if (entity.name() == "block") {
    // Check if the block has not been hit before
    if (!hitBlocks.has(entity)) {
      hitBlocks.add(entity); // Add the block to the set of hit blocks
      score += 1;

      // If all 10 blocks are hit, update the score to "Strike"
      if (hitBlocks.size === 10) {
        score = "Strike! 10";
      }
    }
  }

  // Update the score display
  var scoreTextElement = document.getElementById("txtScore");
  scoreTextElement.innerText = "Score: " + score + " Pins";
}




// Refreshes the game by reloading the page.
function refreshPage() {
  location.reload();
}

// End of Javascript file.


