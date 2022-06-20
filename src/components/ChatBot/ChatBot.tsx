import { useEffect } from 'react';
import Chatbot from '../../modules/Chatbot/index';
import { assistance, client, xIcon } from './assets';
import './ChatBot.css';
import chatImage from '../../assets/images/ChatbotPerson.png';
import { Typography, Box } from '@material-ui/core';
import { chatbotQuestions } from '../../model/chatbot/ChatBotText';

let chatbotInstance;

export function openChatBot() {
	let chatBot: HTMLElement | null = document.querySelector('#chat_bot_logo');

	if (chatBot) {
		let activeChat = document.querySelector('#active_chat');
		if (!activeChat) {
			chatBot.click();
		}
	}
}

export function closeChatBot() {
	let chatBot: HTMLElement | null = document.querySelector('#chat_bot_logo');

	if (chatBot) {
		let activeChat = document.querySelector('#active_chat');
		if (activeChat) {
			chatBot.click();
		}
	}
}

export function hideChatBot() {
	closeChatBot();

	let chatBot: HTMLElement | null = document.querySelector('.chat-bot-container');

	if (chatBot) {
		chatBot.style.display = "none";
	}
}

export function unhideChatBot() {
	let chatBot: HTMLElement | null = document.querySelector('.chat-bot-container');

	if (chatBot) {
		chatBot.style.display = "flex";
	}
}

function ChatBot() {
	useEffect(() => {
		const url = "https://myidfchatbot.azurewebsites.net/qnamaker/knowledgebases/2df455d0-03c9-4691-af84-5b587b4ad028/generateAnswer";
		const authKey = "EndpointKey da634828-9951-45b2-9896-8d56aae009c2";
		const icons = {
			logo: chatImage,
			xIcon: xIcon,
			assistance: assistance,
			client: client
		};
		const questions = chatbotQuestions;
		const options = {
			questions,
			botOptions: {
				url,
				authKey,
			},
			icons
		};

		chatbotInstance = new Chatbot("chat-bot", options);
	}, []);

	return (
		<div className="chat-bot-container">
			<div id="chat-bot"/>
			{/* <Box position="fixed" bottom="10px" left="10px" style={{ backgroundColor: "white", zIndex: 1000, padding: "0px 3px", borderRadius: "5px", boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}> */}
			<Box style={{ backgroundColor: "#383838", zIndex: 1000, padding: "0px 3px", marginTop: 5, borderRadius: 5, boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"}}>
				<Typography className="chat-bot-title">
					היי, איך אפשר לעזור?
				</Typography>
			</Box>

		</div>
	)
}

export default ChatBot
