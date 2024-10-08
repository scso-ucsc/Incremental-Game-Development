import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing prototype for CMPM 121";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Creating Global Variables
let candyCount: number = 0;

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
  const increment = timeElapsed / 1000;
  candyCount += increment;

  //Updating counter
  if (counter) {
    updateCountText(counter);
  }
  requestAnimationFrame(increaseFractionalCandyCount); //Requesting next frame
}

requestAnimationFrame(increaseFractionalCandyCount);

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
