import React from 'react';
import idf2 from '../../assets/images/idf2.png';
import blockedUser from '../../assets/images/blocked-user.png';

export interface FAQ {
    question: {
        icon: any,
        text: any
    },
    answer: {
        text: any
    }
}

const faqs: FAQ[] = [
    {
        question: {
            icon: idf2,
            text: `תעודת הזהות שהמשתמש הקליד לא נמצאה במאגר הצה"לי ו/או מספר הטלפון שלו לא מעודכן במערכות כ"א של צה"ל.`
        },
        answer: {
            text: `א. יש לוודא כי המשתמש הזין תעודת זהות תקינה ונכונה באורך 9 ספרות.\n
            ב. יש לוודא כי המשתמש נמצא במאגר הצה"לי ומשוייך לאוכלוסיה המתאימה.\n
            ג. יש לוודא כי מספר הטלפון של המשתמש נכון ומעודכן במאגר צה"ל בדיגיטל.`
        }
    },
    {
        question: {
            icon: blockedUser,
            text: "נחסם לכם המשתמש לאחר הקלדת סיסמה שגויה יותר מדי פעמים?"
        },
        answer: {
            text: ""
        }
    },
    {
        question: {
            icon: idf2,
            text: ""
        },
        answer: {
            text: ""
        }
    },
    {
        question: {
            icon: "",
            text: ""
        },
        answer: {
            text: ""
        }
    },
    {
        question: {
            icon: "",
            text: ""
        },
        answer: {
            text: ""
        }
    },
    {
        question: {
            icon: "",
            text: ""
        },
        answer: {
            text: ""
        }
    },

]

export default faqs;