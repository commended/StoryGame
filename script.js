
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "DiningRoom";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  DiningRoom: {
    title: "Location: Dining Room",
    character: "Narrator",
    text: "On a dark and stormy night, you and a group of friends are gathered for dinner in Billionaire August's mansion, due to weather conditions, everyone is stuck inside and needs to wait for the storm to pass.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Excuse yourself to the hallway",
        nextScene: "Hallway"
      },
      {
          text: "Chat with dinner guests",
          action: function () {
            pickUpItem("brass key");
          },
          nextScene: "DiningRoom"
      }
    ]
  },

  Hallway: {
    title: "Location: The Hallway",
    text: "The long, dark hallway is silent. You get an eerie chill as you advance.",
    choices: [
      {
        text: "Enter the bathroom",
        nextScene: "BathroomLightOff"
      },
      {
        text: "Enter the bedroom",
        nextScene: "Bedroom"
      },
      {
        text: "Go back to the dining room",
        nextScene: "DiningRoom"
      }
    ]
  },

  Bedroom: {
    title: "Location: The Bedroom",
    text: "The bedroom is quiet. You see something on the floor, but can't make out what it is.",
    choices: [
      {
        text: "Investigate the object",
        nextScene: "TrowelFound"
      },
      {
        text: "Go back to the hallway",
        nextScene: "Hallway"
      }
    ]
  },

   BathroomLightOff: {
    title: "Location: The Bathroom",
    text: "The bathroom is dimly lit. You see a figure in the bath but can't make out details.",
    choices: [
      {
        text: "flick the light switch",
        nextScene: "BathroomLightOn"
      },
      {
        text: "Go back",
        nextScene: "Hallway"
      }
    ]
  },

  BathroomLightOn: {
    title: "Location: The Bathroom",
    text: "The bathroom is now fully lit. You see a figure in the bath, and realize it's August floating in a pool of his own blood!!.",
    choices: [
      {
        text: "Go back",
        nextScene: "Hallway"
      },
      {
        text: "Investigate the body",
        nextScene: "SolutionTouched"
      },
      {
        text: "alert the other guests",
        nextScene: "BodyFound"
      }
    ]
  },
  
  TrowelFound: {
    title: "Location: The Bathroom",
    text: "You find a trowel in the bathroom, covered in blood. You realize that this is the murder weapon.",
    choices: [
      {
        text: "alert the other guests",
        nextScene: "SolutionSolved"
      },
      {
        text: "Grab the Trowel to show to the guests",
        nextScene: "SolutionGrabbed"
      }
    ]
  },

  SolutionTouched: {
    title: "Failed!!",
    text: "You turn the body over to find a hole in his back, shaped like a trowel, but as you stand up 3 guests walk in and see you standing over the body. They call the police and you are arrested for the murder of August.",
    choices: [
    {
        text: "Play again",
        nextScene: "DiningRoom"
      }
    ]
   },

  SolutionGrabbed: {
    title: "Failed!!",
    text: "You grab the trowel and show it to the guests, but as you stand up 3 guests walk in and see you with the bloody trowel in hand. They call the police and you are arrested for the murder of August.",
    choices: [
    {
        text: "Play again",
        nextScene: "DiningRoom"
      }
    ]
   },

   SolutionSolved: {
    title: "Success!!",
    text: "You discover the truth behind August's death, discovering the gardener Had killed him with a trowel and are hailed as a hero for solving the mystery.",
    choices: [
      {
        text: "Play again",
        nextScene: "DiningRoom"
      }
    ]
   },

  BodyFound: {
    title: "Location: Dining Room",
    text: "You alert the other guests, and they all rush to the scene. August is confirmed dead, and you are surrounded by witnesses.",
    choices: [
      {
        text: "Try to explain what happened",
        nextScene: "Examination"
      },
      {
        text: "Accuse the other guests",
        nextScene: "Accusation"
      }
    ]
  },

  Examination: {
    title: "Location: The Examination",
    text: "You try to explain what happened, but the other guests are skeptical.",
    choices: [
      {
        text: "Accuse the other guests",
        nextScene: "Accusation"
      }
    ]
  },

  Accusation: {
    title: "Location: The dining room",
    text: "You accuse the other guests, but they are all shocked and deny any involvement.",
    choices: [
      {
        text: "search the bedroom for clues",
        nextScene: "Bedroom"
      },
      {
        text: "search the bathroom for clues",
        nextScene: "BathroomLightOn"
      }
    ]
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

