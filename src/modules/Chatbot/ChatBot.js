import { ChatRow } from './ChatRow.js';
import { welcomeMessage, anyOtherQuestion } from './constants/consts.js';
import { ButtonRow } from './buttons/ButtonRow.js';
import { scrollTypingIndicator, scrollToClientQuestion } from "./constants/consts";

export class ChatBot {
	constructor(id, { questions, botOptions, icons }) {
		this.id = id;
		this.questions = questions;
		this.botOptions = botOptions;
		this.icons = icons;
		this.mainDiv = document.getElementById(this.id);
		this.logoId = "chat_bot_logo";
		this.activeChatId = "active_chat";
		this.chatContainer = "chat_container";
		this.buildHtmlSkeleton();
	}

	buildHtmlSkeleton() {
		// Logo Icon Config. - clicking on the div opens the activeChatDiv (and closing it).
		this.chatBotLogoDiv = this.createChatBotLogoDiv();
		// Active Chat div
		this.mainDiv.appendChild(this.chatBotLogoDiv);
	}

	// Logo Div related
	createChatBotLogoDiv() {
		const chatBotLogoDiv = document.createElement("DIV");
		chatBotLogoDiv.setAttribute('id', this.logoId)
		let logoStyle = {
			width: "80px",
			height: "65px",
		};
		const logo = createImageWithStyle(this.icons.logo, logoStyle);
		chatBotLogoDiv.appendChild(logo);

		chatBotLogoDiv.addEventListener('click', () => {
			if (this.mainDiv.querySelector("#" + this.activeChatId) == null) {
				// Active Chat div
				this.activeChatDiv = this.createChatDiv();
				this.chatContent();
				this.mainDiv.appendChild(this.activeChatDiv);
			}
			else {
				// remove all children from this.activeChatDiv [id = activeChatId]
				removeElementChildren(this.activeChatId);

				// remove this.activeChatDiv [id = activeChatId] from the mainDiv
				this.mainDiv.removeChild(this.activeChatDiv);


			}
		}, false);
		return chatBotLogoDiv;
	}

	// Chat Div related
	createChatDiv() {
		const activeChatDiv = document.createElement("DIV");
		activeChatDiv.setAttribute('id', this.activeChatId)
		// create Div that holds the xIcon
		const xIconDiv = document.createElement("DIV");
		xIconDiv.setAttribute("class", "xIcon_div");
		xIconDiv.style.minHeight = "20px";
		// xIconDiv.style.display = "inline-block";
		let xIconStyle = {
			width: "10px",
			height: "10px",
			left: "10px",
			top: "6px",
			position: "absolute",
			display: "flex",
			borderRadius: "50%",
			borderColor: "black",
			cursor: "pointer"
		};
		let xIcon = createImageWithStyle(this.icons.xIcon, xIconStyle);

		xIcon.addEventListener("click", () => {
			// remove all children from this.activeChatDiv [id = activeChatId]
			removeElementChildren(this.activeChatId);

			// remove this.activeChatDiv [id = activeChatId] from the mainDiv
			this.mainDiv.removeChild(this.activeChatDiv);
		}, false);

		xIconDiv.appendChild(xIcon);
		activeChatDiv.appendChild(xIconDiv);
		return activeChatDiv;
	}

	scrollDown(containerId, innerElementClassName) {
    const container = document.querySelector('#' + containerId);

    let ElementsSameClassName = document.getElementById(containerId).getElementsByClassName(innerElementClassName);
    let lastChild = ElementsSameClassName[ElementsSameClassName.length - 1];
    container.scrollTop = lastChild.offsetTop;
}

	
	// Buttons clicks create a user interaction
	async buttonEventListener(faq) {
		let activeChatContainer = document.getElementById(this.chatContainer);
		console.log(activeChatContainer == null);
		// step 1: create client chat row with the selected question
		activeChatContainer.appendChild(new ChatRow(true, faq.question, this.icons.client, false).buildChatMessages());
		const buttonsToDisable = activeChatContainer.getElementsByClassName('keyboard-rounded three-d');
		for (let button of buttonsToDisable) {
			button.disabled = true;
		}
		
		const botTyping = new ChatRow(false, "TypingIndicator!", this.icons.assistance, true).buildChatMessages();
		activeChatContainer.appendChild(botTyping);
		this.scrollDown("chat_container", scrollTypingIndicator);
		// Step 2: Display the answer of the selected question
		setTimeout(() => {
			activeChatContainer.removeChild(botTyping);
			activeChatContainer.appendChild(new ChatRow(false, faq.answer, this.icons.assistance, false).buildChatMessages());
			this.createChatFlow(anyOtherQuestion);
			this.scrollDown("chat_container", scrollToClientQuestion);
		}, 2000);
	}

	// Chat Div related
	async chatContent() {
		let chatContainerDiv = document.createElement("DIV");
		chatContainerDiv.setAttribute("id", this.chatContainer);
		chatContainerDiv.scrollTop = chatContainerDiv.scrollHeight;
		let chatContainerDivStyle = {
			overflow: 'auto',
			overflowY: "auto",
			overflowX: "auto",
			maxWidth: "280px",
			minHeight: "360px",
			padding: "5px",
			top: "10px",
			bottom: "0px",
			position: "relative",
			alignItems: "center",
			marginBlockEnd: "10px",
		};
		for (let prop of Object.keys(chatContainerDivStyle)) {
			chatContainerDiv.style[prop.toString()] = chatContainerDivStyle[prop.toString()];
		}
		this.activeChatDiv.appendChild(chatContainerDiv);
		this.createChatFlow(welcomeMessage);
	}

	createChatFlow(botMessage) {
		let activeChatContainer = this.activeChatDiv.querySelector("#" + this.chatContainer);

		// Step 1: Bot welcomes the client 
		activeChatContainer.appendChild(new ChatRow(false, botMessage, this.icons.assistance, false).buildChatMessages());
		// Step 2: Show options (Questions) to the client

		activeChatContainer.appendChild(new ButtonRow(this.questions, this.buttonEventListener.bind(this)).createButtonRow());
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
	const node = document.getElementById(elementId);

	node.querySelectorAll('*').forEach(n => n.remove());
}
