import { Button } from "./Button";
// import ChatBot from "..";
// import { ChatRow } from "../ChatRow";



export class ButtonRow {
    constructor(faqs, eventHandlerFunction){
        this.faqs = faqs;
        this.eventHandlerFunction = eventHandlerFunction;
    }

    createButtonRow() {
        const buttonRowDiv = document.createElement("DIV");
        buttonRowDiv.setAttribute("class", "buttons_row");
        buttonRowDiv.style.alignItems = 'center';
        buttonRowDiv.style.padding = "10px";
        let buttonElement; 
        for (let faq of this.faqs) {
            buttonElement = new Button(faq).createButton();
            buttonElement.addEventListener('click', () => {
                if (this.eventHandlerFunction && (typeof this.eventHandlerFunction == "function")) {  
                    this.eventHandlerFunction(faq);
                }
                
            }, {once : true});
            buttonRowDiv.appendChild(buttonElement);
        }

        return buttonRowDiv;
    }
}   

// Useful method to create dynamically images with styling
function createImageWithStyle(dataURI, style) {
    const styledImage = document.createElement("IMG");
    styledImage.setAttribute("src", dataURI);
    for (let prop of Object.keys(style)) {
        styledImage.style[prop.toString()] = style[prop.toString()];
    }
    return styledImage;
}

function removeElementChildren(elementId) {
    var node = document.getElementById(elementId);
    node.querySelectorAll('*').forEach(n => n.remove());
}

