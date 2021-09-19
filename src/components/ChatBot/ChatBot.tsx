import React, { useEffect } from 'react';
import Chatbot from '../../modules/Chatbot/index';
import { assistance, client, xIcon, defaultGIF } from './assets';
import './ChatBot.css';
import chatImage from '../../assets/images/ChatbotPerson.png';
import { Typography, Box } from '@material-ui/core';

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

function ChatBott() {
	useEffect(() => {
		const url = "https://myidfchatbot.azurewebsites.net/qnamaker/knowledgebases/2df455d0-03c9-4691-af84-5b587b4ad028/generateAnswer";
		const authKey = "EndpointKey da634828-9951-45b2-9896-8d56aae009c2";
		const icons = {
			logo: chatImage,
			xIcon: xIcon,
			assistance: assistance,
			client: client
		};
		const questions = [
			{
				id: 1,
				question: "מה זה My IDF?",
				answer:
					`My IDF הוא מנגנון ההזדהות הצה"לי לכל האתרים והאפליקציות של צה"ל באינטרנט!<br>

שם משתמש אחד וסיסמה אחת לכל משרת עבור כל האפליקציות.`
			},
			{
				id: 2,
				question: `הזנתי מספר ת"ז ולא נשלח

אלי קוד לטלפון הנייד`,
				answer:`מספר הטלפון שברשותך אינו מעודכן ברישומת הצה"לית ויש לעדכנו. <br><br>
					<u>לחיילי חובה וקבע</u> - יש להתחבר לאתר הפרט (<a href="https://prat.idf.il">Prat.idf.il</a>) ולעדכן את מספר הטלפון ב- "הפרופיל שלי".<br>
					לאחר כרבע שעה ניתן יהיה לשוב ולהשלים את תהליך הרישום. לחילופין, יש לפנות לקצין/ת המשא"ן ביחידה.<br><br>
					<u>גמלאים</u> - יש לעדכן את פרטי ההתקשרות מול מוקד מופת.<br><br>
					<u>מילואים</u> - יש לעדכן את פרטי הקשר אצל קצין/ת הקישור.<br><br>
					<u>אזרחים עובדי צה"ל</u> - יש לעדכן את פרטי הקשר אצל קצין/ת האזרחים.`,
			},
			{
				id: 3,
				question: `קוד האימות הדו-שלבי לא מגיע
				לאחר שהזנתי את הסיסמה הראשונית
				`,
				answer: `תמיד אפשר לבקש קוד נוסף!<br>
					יש לפעול עפ"י הוראות התמיכה המפורסמות באתר בעת תהליך הרישום.`,
			},
			{
				id: 4,
				question: `אני מקבל שגיאה עבור כל סיסמה שאני בוחר`,
				answer: `אנחנו מגנים עליכם ברשת ולכן יש לבחור סיסמה העומדת בנהלי אבטחת המידע של צה"ל.<br>
					על הסיסמה להיות באורך של 8 תווים ולהכיל לפחות אות אחת גדולה באנגלית, אות אחת קטנה באנגלית
					וכן, צריכה לכלול בנוסף לאותיות גם מספרים ו/או סימנים.`
			},
			{
				id: 5,
				question: `איך אפשר לקבל תמיכה נוספת?`,
				answer: `אני כאן כדי לסייע לכם!<br>
				לקבלת עזרה, יש למלא את הטופס בקישור הבא: <a style="overflow-wrap: break-word;" target="_blank" href="https://forms.office.com/Pages/ResponsePage.aspx?id=UgiCePpVC0WQjUXA2RHna2yakDZhryRNgOKw_RiocBtUME9LWlVITFBTMEJDMVlSSzVZRFUwWk5FUi4u">https://forms.office.com/Pages/ResponsePage.aspx?id=UgiCePpVC0WQjUXA2RHna2yakDZhryRNgOKw_RiocBtUME9LWlVITFBTMEJDMVlSSzVZRFUwWk5FUi4u</a>`
			},
		];
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

export default ChatBott
