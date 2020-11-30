export class Button {
    constructor(props) {
        this.id = props.id;
        this.question = props.question;
        this.answer = props.answer;
    }

    createButton() {
        const button = document.createElement("BUTTON");
        button.setAttribute("id", this.id);
        button.setAttribute("class", "keyboard-rounded three-d");

        const span = document.createElement("SPAN");
        span.textContent = this.question;
        button.appendChild(span);
        // button.addEventListener("click", ChatBot.buttonEventListener({id: this.id, question: this.question, answer: this.answer}));
        return button;
    }
}