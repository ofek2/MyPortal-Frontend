export class TypingIndicator {

    constructor() {}

    buildIndicator() {
        const indicatorContainer = document.createElement("DIV");
        indicatorContainer.setAttribute("class", "ticontainer");
        indicatorContainer.style.marginTop = "15px";

        const indicatorBlock = document.createElement("DIV");
        indicatorBlock.setAttribute("class", "tiblock");

        const indicatorDot1 = document.createElement("DIV");
        const indicatorDot2 = document.createElement("DIV");
        const indicatorDot3 = document.createElement("DIV");
        indicatorDot1.setAttribute("class", "tidot");
        indicatorDot2.setAttribute("class", "tidot");
        indicatorDot3.setAttribute("class", "tidot");
        indicatorBlock.appendChild(indicatorDot1);
        indicatorBlock.appendChild(indicatorDot2);
        indicatorBlock.appendChild(indicatorDot3);
        indicatorContainer.appendChild(indicatorBlock);
        return indicatorContainer;
    }

}