import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Sugar 🍬 Rush!!!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Creating Global Variables
let candyCount: number = 0;
let autoChomperCount: number = 0;
let superChomperCount: number = 0;
let gigaChomperCount: number = 0;
const autoChomperCost: number = 10;
const superChomperCost: number = 100;
const gigaChomperCost: number = 1000;
let currentGrowthRate: number = 0;
let autoGrowth: boolean = false;

//Creating Grid to define page layout
const styleElementGrid = document.createElement("style");
styleElementGrid.textContent = `
    body {
        display: grid;
        place-items: center;
        height: 100vh;
        margin: 0
    }
`;

app.appendChild(styleElementGrid);

//Step 1: Creating a button
const button: HTMLElement = createButton();
button.addEventListener("click", increaseCandyCount);
app.appendChild(button); //Appending button to webpage app

function createButton() {
  const newButton = document.createElement("button"); //Creating button element

  newButton.innerText = "🍬 Eat the candy!!!"; //Assigning variables
  newButton.id = "mainButton";
  newButton.className = "button_main";
  return newButton;
}

//Step 2: Clicking increases counter
const counter: HTMLElement = createCounter();
app.appendChild(counter);

function createCounter() {
  //Creating counter
  const newCounter = document.createElement("counter");
  newCounter.style.display = "flex";
  newCounter.style.justifyContent = "center";
  newCounter.style.alignItems = "center";
  newCounter.style.height = "10vh";
  newCounter.style.fontSize = "30px";

  updateCountText(newCounter);
  return newCounter;
}

//Step 3: Automatic Clicker
//setInterval(increaseCandyCount, 1000); //Calls increaseCandyCount() every second
//This step was commented out due to the instructions of Step 4

//Step 4: Continuous Growth
let previousTimestamp = 0;

function increaseFractionalCandyCount(timestamp: number) {
  if (previousTimestamp === 0) {
    previousTimestamp = timestamp;
  }

  //Calculating the amount of time since the previous frame
  const timeElapsed = timestamp - previousTimestamp;
  previousTimestamp = timestamp;

  //Incrementing based on passed time
  const increment = (timeElapsed / 1000) * currentGrowthRate;
  candyCount += increment;

  //Updating counter
  if (counter) {
    updateCountText(counter);
  }
  requestAnimationFrame(increaseFractionalCandyCount); //Requesting next frame
}

//Step 5: Purchasing an Upgrade
const upgradeButton1: HTMLElement = createUpgradeButton(
  `Automatic 🍬 Chomper!!! (Cost: ${autoChomperCost})`,
  "upgradeButton1",
  "button_upgrade1",
);
upgradeButton1.addEventListener("click", activateAutoChomper);
app.appendChild(upgradeButton1); //Appending button to webpage app

function createUpgradeButton(innerText: string, id: string, className: string) {
  const newButton = document.createElement("button"); //Creating button element

  newButton.innerText = innerText; //Assigning variables
  newButton.id = id;
  newButton.className = className;
  return newButton;
}

const upgradeButtonElement1 = document.getElementById(
  "upgradeButton1",
) as HTMLButtonElement; //Setting upgradeButtonElement variable for enable/disabled feature
setInterval(checkCandyCount, 0); //Constantly check if count is greater than 10

//Step 6: Multiple Upgrades and Status
const upgradeButton2: HTMLElement = createUpgradeButton(
  `Super Automatic 🍬 Chomper!!! (Cost: ${superChomperCost})`,
  "upgradeButton2",
  "button_upgrade2",
);
upgradeButton2.addEventListener("click", activateSuperChomper);
app.appendChild(upgradeButton2); //Appending button to webpage app

const upgradeButton3: HTMLElement = createUpgradeButton(
  `Giga Automatic 🍬 Chomper!!! (Cost: ${gigaChomperCost})`,
  "upgradeButton3",
  "button_upgrade3",
);
upgradeButton3.addEventListener("click", activateGigaChomper);
app.appendChild(upgradeButton3); //Appending button to webpage app

const upgradeButtonElement2 = document.getElementById(
  "upgradeButton2",
) as HTMLButtonElement; //Setting upgradeButtonElement variable for enable/disabled feature

const upgradeButtonElement3 = document.getElementById(
  "upgradeButton3",
) as HTMLButtonElement; //Setting upgradeButtonElement variable for enable/disabled feature

const playerStatsTitle: HTMLElement = document.createElement("h2"); //Creating Statistics Elements
playerStatsTitle.style.display = "flex";
playerStatsTitle.style.justifyContent = "center";
playerStatsTitle.style.alignItems = "center";
playerStatsTitle.style.height = "10vh";
playerStatsTitle.style.fontSize = "26px";
playerStatsTitle.innerText = "Player Stats:";
app.appendChild(playerStatsTitle);

const autoRateText: HTMLElement = createStatsText();
updateStatsText("rate");
app.appendChild(autoRateText);

const autoChomperStatsText: HTMLElement = createStatsText();
const superChomperStatsText: HTMLElement = createStatsText();
const gigaChomperStatsText: HTMLElement = createStatsText();
updateStatsText("auto");
updateStatsText("super");
updateStatsText("giga");
app.appendChild(autoChomperStatsText);
app.appendChild(superChomperStatsText);
app.appendChild(gigaChomperStatsText);

//HELPER FUNCTIONS
function increaseCandyCount() {
  //Increasing candyCount by 1 and then updating the counter text
  candyCount += 1;
  updateCountText(counter);
}

function updateCountText(counter: HTMLElement) {
  //Updating the counter text
  counter.innerText = "Candies eaten: " + candyCount.toFixed(2).toString();
}

function checkCandyCount() {
  //Checks if player has eaten enough candy to purchase the respective upgrade
  if (candyCount >= 10) {
    upgradeButtonElement1.disabled = false;
  } else {
    upgradeButtonElement1.disabled = true;
  }

  if (candyCount >= 100) {
    upgradeButtonElement2.disabled = false;
  } else {
    upgradeButtonElement2.disabled = true;
  }

  if (candyCount >= 1000) {
    upgradeButtonElement3.disabled = false;
  } else {
    upgradeButtonElement3.disabled = true;
  }
}

function activateAutoChomper() {
  autoChomperCount += 1;
  currentGrowthRate += 0.1;
  candyCount -= 10;
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate"); //Updating Stats
  updateStatsText("auto");
}

function activateSuperChomper() {
  superChomperCount += 1;
  currentGrowthRate += 2;
  candyCount -= 100;
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate"); //Updating Stats
  updateStatsText("super");
}

function activateGigaChomper() {
  gigaChomperCount += 1;
  currentGrowthRate += 50;
  candyCount -= 1000;
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate"); //Updating Stats
  updateStatsText("giga");
}

function updateStatsText(upgradeType: string) {
  if (upgradeType === "rate") {
    autoRateText.innerText = `Current Growth Rate: ${currentGrowthRate.toFixed(1)} candies/sec`;
  } else if (upgradeType === "auto") {
    autoChomperStatsText.innerText = `No. of Auto Chompers: ${autoChomperCount}`;
  } else if (upgradeType === "super") {
    superChomperStatsText.innerText = `No. of Super Auto Chompers: ${superChomperCount}`;
  } else {
    gigaChomperStatsText.innerText = `No. of Giga Auto Chompers: ${gigaChomperCount}`;
  }
}

function createStatsText() {
  //Function to create statistics text
  const newStatsText = document.createElement("p");
  newStatsText.style.display = "flex";
  newStatsText.style.justifyContent = "center";
  newStatsText.style.alignItems = "center";
  newStatsText.style.height = "2vh";
  newStatsText.style.fontSize = "20px";
  return newStatsText;
}
