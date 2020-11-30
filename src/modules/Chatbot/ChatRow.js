import { TypingIndicator } from "./typingIndicator/TypingIndicator";

export class ChatRow {
    constructor(isClient, message, icon, isBotTyping) {
        this.isClient = isClient;
        this.message = message;
        this.icon = icon;
        this.isBotTyping = isBotTyping;
    }

    buildChatMessages() {
        let divNextToIcon;
        
        // create icon for client / bot 
        const chatIconDiv = this.createChatIcon(this.icon);

        // Container Div holds: icon + message pop up
        const chatLine = document.createElement("DIV");
        
        if (this.isBotTyping) {
            chatLine.setAttribute("class", "chat_line_typing");
            divNextToIcon = this.createTypingIndicator();
        } else {
            if (this.isClient) {
                chatLine.setAttribute("class", "chat_line_client");
            } else {
                chatLine.setAttribute("class", "chat_line");
            }
            divNextToIcon = this.createMessagePopup();
        }

        chatLine.style.display = "flex";
        chatLine.style.flexDirection = "row";
        chatLine.style.minHeight = "20%";
        chatLine.style.height = "auto";
        chatLine.style.paddingBlock = "5px";
        if (this.isClient) {
            chatLine.style.flexDirection = "row-reverse";
        }

        chatLine.appendChild(chatIconDiv);
        chatLine.appendChild(divNextToIcon);
        return chatLine;
    }

    createTypingIndicator() {
        return new TypingIndicator().buildIndicator();
    }

    createMessagePopup() {
        const messagePopupDiv = document.createElement("DIV");
        messagePopupDiv.setAttribute("class", "message_popup");

        let messagePopupDivStyle = {
            width: "65%",
            padding: "5px",
            minHeight: "30px",
            textAlign: "right",
            borderRadius: "5px",
            marginBottom: "5px"
        };
        if (this.isClient) {
            messagePopupDivStyle.backgroundColor = "#bbdefb";
            messagePopupDivStyle.right = "50px";
        }
        else {
            messagePopupDivStyle.backgroundColor = "#E6E7ED";
            messagePopupDivStyle.left = "50px";
        }

        for (let prop of Object.keys(messagePopupDivStyle)) {
            messagePopupDiv.style[prop.toString()] = messagePopupDivStyle[prop.toString()];
        }

        const messageText = document.createElement("P");
        var textNode = document.createTextNode(this.message);
        messageText.appendChild(textNode);
        messagePopupDiv.appendChild(messageText);
        return messagePopupDiv;
    }

    createChatIcon(icon) {
        let chatUserIconStyle = {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
        };
        const chatUserIcon = createImageWithStyle(icon, chatUserIconStyle);
        
        const iconDiv = document.createElement("DIV");
        iconDiv.setAttribute("class", "icon_div");
        iconDiv.style.width = chatUserIconStyle.width;
        iconDiv.style.padding = "5px";
        iconDiv.appendChild(chatUserIcon);
        return iconDiv;
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

// function scrollDown(containerId) {
// 	var container = document.querySelector('#' + containerId);
// 	container.maxScrollTop = container.scrollHeight - container.offsetHeight;
// 	container.scrollTop = container.scrollHeight;
// }

function scrollDown(containerId, innerElementId) {
    const container = document.querySelector('#' + containerId);
    const innerElement = document.querySelector('.' + innerElementId);
    //container.maxScrollTop = container.scrollHeight - container.offsetHeight;
    container.scrollTop = innerElement.scrollHeight;
}