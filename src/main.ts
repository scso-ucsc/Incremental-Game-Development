import "./style.css";
import imageSource from "./eat_candy.png";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🍬 EAT THE CANDY!!! 🍬";
document.title = gameName;
document.body.style.backgroundColor = "#ecc9f2";

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Creating Global Variables
let candyCount: number = 0;
let autoChomperCount: number = 0;
let superChomperCount: number = 0;
let gigaChomperCount: number = 0;
let teraChomperCount: number = 0;
let monsterChomperCount: number = 0;
let currentGrowthRate: number = 0;
let autoGrowth: boolean = false;
let previousTimestamp = 0;

//Setting Up Interface
interface AutoChomper {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableChompers: AutoChomper[] = [
  {
    name: "auto",
    cost: 10,
    rate: 0.1,
    description:
      "A simple chomper that isn't too big of a fan of sweets. It will chew small candies one at a time.",
  },
  {
    name: "super",
    cost: 100,
    rate: 2,
    description: "A casual chomper that doesn't mind if it munches on two!",
  },
  {
    name: "giga",
    cost: 1000,
    rate: 50,
    description:
      "A large chomper that consumes multiple candies like eating a single box of Nerds.",
  },
  {
    name: "tera",
    cost: 5000,
    rate: 200,
    description:
      "Trained to munch and power through sugar rush, this chomper consumes sugar at an alarming rate.",
  },
  {
    name: "monster",
    cost: 100000,
    rate: 1000,
    description:
      "The ulimate chomper that seeks to consume the entire world's supply of candy. Many wonder how it hasn't developed diabetes.",
  },
];

//Main Functions
function createStyle(): void {
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
}

function createCandyEatButton(): void {
  const eatCandyButton = document.createElement("img");
  eatCandyButton.src = imageSource;
  eatCandyButton.id = "eatButton";

  eatCandyButton.style.cursor = "pointer";
  eatCandyButton.style.width = "300px";
  eatCandyButton.style.height = "300px";
  app.appendChild(eatCandyButton);
  eatCandyButton.addEventListener("click", increaseCandyCount);
}

function createCounter(): HTMLElement {
  //Creating counter
  const newCounter = document.createElement("counter");
  newCounter.style.display = "flex";
  newCounter.style.justifyContent = "center";
  newCounter.style.alignItems = "center";
  newCounter.style.height = "10vh";
  newCounter.style.fontSize = "30px";
  app.appendChild(newCounter);

  updateCountText(newCounter);
  return newCounter;
}

function createUpgradeButton(
  innerText: string,
  id: string,
  className: string,
  bgColour: string
): HTMLElement {
  const newButton = document.createElement("button"); //Creating button element

  newButton.innerText = innerText; //Assigning variables
  newButton.id = id;
  newButton.className = className;
  newButton.style.backgroundColor = bgColour;
  app.appendChild(newButton);
  return newButton;
}

function createStatisticsTitle(): void {
  const playerStatsTitle: HTMLElement = document.createElement("h2"); //Creating Statistics Elements
  playerStatsTitle.style.display = "flex";
  playerStatsTitle.style.justifyContent = "center";
  playerStatsTitle.style.alignItems = "center";
  playerStatsTitle.style.height = "10vh";
  playerStatsTitle.style.fontSize = "26px";
  playerStatsTitle.innerText = "Player Stats:";
  app.appendChild(playerStatsTitle);
}

function createStatsText(): HTMLElement {
  const newStatsText = document.createElement("p");
  newStatsText.style.display = "flex";
  newStatsText.style.justifyContent = "center";
  newStatsText.style.alignItems = "center";
  newStatsText.style.height = "2vh";
  newStatsText.style.fontSize = "20px";
  app.appendChild(newStatsText);
  return newStatsText;
}

function createDescriptionText(descSource: string): HTMLElement {
  const newDescription = document.createElement("p");
  newDescription.style.display = "flex";
  newDescription.style.justifyContent = "center";
  newDescription.style.alignItems = "center";
  newDescription.style.height = "2vh";
  newDescription.style.fontSize = "12px";
  newDescription.innerText = getChomperDescription(descSource);
  app.appendChild(newDescription);
  return newDescription;
}

function increaseCandyCount(): void {
  //Increasing candyCount by 1 and then updating the counter text
  candyCount += 1;
  updateCountText(counter);
}

function increaseUpgradeCost(upgradeType: string): void {
  for (const chomper of availableChompers) {
    if (chomper.name === upgradeType) {
      chomper.cost *= 1.15;
      updateUpgradeButtonText(chomper.name);
      break;
    }
  }
}

function increaseFractionalCandyCount(timestamp: number): void {
  if (previousTimestamp === 0) {
    previousTimestamp = timestamp;
  }

  const timeElapsed = timestamp - previousTimestamp; //Calculating the amount of time since the previous frame
  previousTimestamp = timestamp;

  const increment = (timeElapsed / 1000) * currentGrowthRate; //Incrementing based on passed time
  candyCount += increment;

  if (counter) {
    updateCountText(counter);
  }
  requestAnimationFrame(increaseFractionalCandyCount); //Requesting next frame
}

function updateStatsText(upgradeType: string): void {
  if (upgradeType === "rate") {
    autoRateText.innerText = `Current Growth Rate: ${currentGrowthRate.toFixed(1)} candies/sec`;
  } else if (upgradeType === "auto") {
    autoChomperStatsText.innerText = `No. of Auto Chompers: ${autoChomperCount}`;
  } else if (upgradeType === "super") {
    superChomperStatsText.innerText = `No. of Super Auto Chompers: ${superChomperCount}`;
  } else if (upgradeType === "giga") {
    gigaChomperStatsText.innerText = `No. of Giga Auto Chompers: ${gigaChomperCount}`;
  } else if (upgradeType === "tera") {
    teraChomperStatsText.innerText = `No. of Tera Auto Chompers: ${teraChomperCount}`;
  } else {
    monsterChomperStatsText.innerText = `No. of Monster Chompers: ${monsterChomperCount}`;
  }
}

function updateUpgradeButtonText(buttonName: string): void {
  if (buttonName === "auto") {
    upgradeButton1.innerText = `Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("auto").toFixed(2)})`;
  } else if (buttonName === "super") {
    upgradeButton2.innerText = `Super Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("super").toFixed(2)})`;
  } else if (buttonName === "giga") {
    upgradeButton3.innerText = `Giga Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("giga").toFixed(2)})`;
  } else if (buttonName === "tera") {
    upgradeButton4.innerText = `Tera Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("tera").toFixed(2)})`;
  } else {
    upgradeButton5.innerText = `Monster Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("monster").toFixed(2)})`;
  }
}

function updateCountText(counter: HTMLElement): void {
  counter.innerText = "Candies Eaten: " + candyCount.toFixed(2).toString();
}

function updateAllStatsText(): void {
  updateStatsText("rate");
  updateStatsText("auto");
  updateStatsText("super");
  updateStatsText("giga");
  updateStatsText("tera");
  updateStatsText("monster");
}

function checkCandyCount(): void {
  if (candyCount >= getChomperCost("auto")) {
    upgradeButtonElement1.disabled = false;
  } else {
    upgradeButtonElement1.disabled = true;
  }

  if (candyCount >= getChomperCost("super")) {
    upgradeButtonElement2.disabled = false;
  } else {
    upgradeButtonElement2.disabled = true;
  }

  if (candyCount >= getChomperCost("giga")) {
    upgradeButtonElement3.disabled = false;
  } else {
    upgradeButtonElement3.disabled = true;
  }

  if (candyCount >= getChomperCost("tera")) {
    upgradeButtonElement4.disabled = false;
  } else {
    upgradeButtonElement4.disabled = true;
  }

  if (candyCount >= getChomperCost("monster")) {
    upgradeButtonElement5.disabled = false;
  } else {
    upgradeButtonElement5.disabled = true;
  }
}

function getChomperCost(desiredChomper: string): number {
  for (const chomper of availableChompers) {
    if (chomper.name === desiredChomper) {
      return chomper.cost;
    }
  }
  return 0;
}

function getChomperRate(desiredChomper: string): number {
  for (const chomper of availableChompers) {
    if (chomper.name === desiredChomper) {
      return chomper.rate;
    }
  }
  return 0;
}

function getChomperDescription(desiredChomper: string): string {
  for (const chomper of availableChompers) {
    if (chomper.name === desiredChomper) {
      return chomper.description;
    }
  }
  return "";
}

function setHTMLButtonElement(desiredID: string): HTMLButtonElement {
  return document.getElementById(desiredID) as HTMLButtonElement;
}

function activateAutoChomper(): void {
  autoChomperCount += 1;
  currentGrowthRate += getChomperRate("auto");
  candyCount -= getChomperCost("auto");
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate");
  updateStatsText("auto");
  increaseUpgradeCost("auto");
}

function activateSuperChomper(): void {
  superChomperCount += 1;
  currentGrowthRate += getChomperRate("super");
  candyCount -= getChomperCost("super");
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate");
  updateStatsText("super");
  increaseUpgradeCost("super");
}

function activateGigaChomper(): void {
  gigaChomperCount += 1;
  currentGrowthRate += getChomperRate("giga");
  candyCount -= getChomperCost("giga");
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate");
  updateStatsText("giga");
  increaseUpgradeCost("giga");
}

function activateTeraChomper(): void {
  teraChomperCount += 1;
  currentGrowthRate += getChomperRate("tera");
  candyCount -= getChomperCost("tera");
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate");
  updateStatsText("tera");
  increaseUpgradeCost("tera");
}

function activateMonsterChomper(): void {
  monsterChomperCount += 1;
  currentGrowthRate += getChomperRate("monster");
  candyCount -= getChomperCost("monster");
  if (autoGrowth === false) {
    requestAnimationFrame(increaseFractionalCandyCount); //Activating automatic increments if not active yet
    autoGrowth = true;
  }
  updateStatsText("rate");
  updateStatsText("monster");
  increaseUpgradeCost("monster");
}

//Creating Grid, Counter, Buttons, and Text
createStyle();
createCandyEatButton();
const counter: HTMLElement = createCounter();

const upgradeButton1: HTMLElement = createUpgradeButton(
  `Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("auto").toFixed(2)})`,
  "upgradeButton1",
  "button_upgrade1",
  "#e36862"
);
upgradeButton1.addEventListener("click", activateAutoChomper);
createDescriptionText("auto");

const upgradeButton2: HTMLElement = createUpgradeButton(
  `Super Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("super").toFixed(2)})`,
  "upgradeButton2",
  "button_upgrade2",
  "#ebe37a"
);
upgradeButton2.addEventListener("click", activateSuperChomper);
createDescriptionText("super");

const upgradeButton3: HTMLElement = createUpgradeButton(
  `Giga Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("giga").toFixed(2)})`,
  "upgradeButton3",
  "button_upgrade3",
  "#7f86e3"
);
upgradeButton3.addEventListener("click", activateGigaChomper);
createDescriptionText("giga");

const upgradeButton4: HTMLElement = createUpgradeButton(
  `Tera Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("tera").toFixed(2)})`,
  "upgradeButton4",
  "button_upgrade4",
  "#8bff87"
);
upgradeButton4.addEventListener("click", activateTeraChomper);
createDescriptionText("tera");

const upgradeButton5: HTMLElement = createUpgradeButton(
  `Monster Automatic 🍬 Chomper!!! (Cost: ${getChomperCost("monster").toFixed(2)})`,
  "upgradeButton5",
  "button_upgrade5",
  "#ff9729"
);
upgradeButton5.addEventListener("click", activateMonsterChomper);
createDescriptionText("monster");

const upgradeButtonElement1 = setHTMLButtonElement("upgradeButton1");
const upgradeButtonElement2 = setHTMLButtonElement("upgradeButton2");
const upgradeButtonElement3 = setHTMLButtonElement("upgradeButton3");
const upgradeButtonElement4 = setHTMLButtonElement("upgradeButton4");
const upgradeButtonElement5 = setHTMLButtonElement("upgradeButton5");

setInterval(checkCandyCount, 0); //Constantly check for availability of upgrades

createStatisticsTitle();
const autoRateText: HTMLElement = createStatsText();
const autoChomperStatsText: HTMLElement = createStatsText();
const superChomperStatsText: HTMLElement = createStatsText();
const gigaChomperStatsText: HTMLElement = createStatsText();
const teraChomperStatsText: HTMLElement = createStatsText();
const monsterChomperStatsText: HTMLElement = createStatsText();

updateAllStatsText();
