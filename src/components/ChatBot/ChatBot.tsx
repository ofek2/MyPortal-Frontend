import React, { useEffect } from 'react';
import Chatbot from '../../modules/Chatbot/index';
import { assistance, client, xIcon, defaultGIF } from './assets';
import './ChatBot.css';

let chatbotInstance;

function ChatBott() {
	useEffect(() => {
		const url = "https://myidfchatbot.azurewebsites.net/qnamaker/knowledgebases/2df455d0-03c9-4691-af84-5b587b4ad028/generateAnswer";
		const authKey = "EndpointKey da634828-9951-45b2-9896-8d56aae009c2";
		const icons = {
			logo: defaultGIF,
			xIcon: xIcon,
			assistance: assistance,
			client: client
		};
		const questions = [
			{
				id: 1,
				question: "הזנתי מספר תעודת זהות ולא נשלח אלי קוד לטלפון הנייד",
				answer:
					`מספר הטלפון שברשותך אינו מעודכן ברישומת הצה"לית ויש לעדכנו.
                    לחיילי חובה וקבע - יש לפנות לצוות המשא"ן ביחידה ולהמתין 24 שעות לעדכון.
                    גמלאים - יש לעדכן את פרטי ההתקשרות מול מוקד מופת.
                    מילואים - יש לעדכן את פרטי הקשר אצל קצינת הקישור.
                    אזרחים עובדי צה"ל - יש לעדכן את פרטי הקשר אצל קצין האזרחים.`,
			},
			{
				id: 2,
				question: "קוד האימות הדו-שלבי לא מגיע לאחר ביצוע הרישום ל-MFA",
				answer: 'יש לפעול עפ"י הוראות התמיכה המפורסמות באתר בעת תהליך הרישום.',
			},
			{
				id: 3,
				question: "אני מקבל שגיאה עבור כל סיסמה שאני בוחר",
				answer: `יש לבחור סיסמה העומדת בנהלי אבטחת המידע של צה"ל. על הסיסמה להיות באורך של 8 תווים ולהכיל לפחות אות אחת גדולה באנגלית, אות אחת קטנה באנגלית וכן, צריכה לכלול בנוסף לאותיות גם מספרים ו/או סימנים.`,
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
		<div id="chat-bot" />
	)
}

export default ChatBott
