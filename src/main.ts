import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing prototype for CMPM 121";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Creating DIV to act as parent
const newDiv = document.createElement("div");
newDiv.id = "elementsParent";
document.body.appendChild(newDiv); //Appending to document's body

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

newDiv.appendChild(styleElementGrid);

//Step 1: Creating a button
function createButton() {
  const button = document.createElement("button"); //Creating button element

  button.innerText = "🍬 Click on the candy!!!"; //Assigning variables
  button.id = "mainButton";
  button.className = "button_main";

  newDiv.appendChild(button); //Appending button to newDiv
}

//Execute Page
createButton();
