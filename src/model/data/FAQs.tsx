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
            text: `לא קיבלת קוד בן 6 ספרות בשלב שתיים?`
        },
        answer: {
            text: <>
            תעודת הזהות שהמשתמש הקליד לא נמצאה במאגר הצה"לי ו/או מספר הטלפון שלו לא מעודכן במערכות כ"א של צה"ל.<br></br><br></br>
            א. יש לוודא כי המשתמש הזין תעודת זהות תקינה ונכונה באורך 9 ספרות.<br></br>
            ב. יש לוודא כי המשתמש נמצא במאגר הצה"לי ומשוייך לאוכלוסיה המתאימה.<br></br>
            ג. יש לוודא כי מספר הטלפון של המשתמש נכון ומעודכן במאגר צה"ל בדיגיטל.</>
        }
    },
    {
        question: {
            icon: blockedUser,
            text: "החשבון שלי ננעל ואני לא מצליח להתחבר! מה לעשות?"
        },
        answer: {
            text: <>יש לפנות לתמיכה ע"י מילוי פניה בטופס: <a href="https://go.idf.il/support">https://go.idf.il/support</a></>
        }
    },
    {
        question: {
            icon: idf2,
            text: `קיבלתי שגיאה: "ייתכן ששם משתמש זה שגוי" `
        },
        answer: {
            text: <>יש לוודא כי שם המשתמש שהקלדת הינו בפורמט: <span dir="ltr">123456789@idf.il</span>  כאשר הספרות הינן מספר תעודת הזהות שלך באורך 9 ספרות</>

        }
    },
    {
        question: {
            icon: blockedUser,
            text: `לאחר שהזנתי את שם המשתמש והסיסמה קיבלתי הודעה: "החשבון או הסיסמה שלך שגויים".`
        },
        answer: {
            text: <>
                יש לוודא כי הסיסמה שהוקלדה נכונה. חשוב לשים לב שמדובר בסיסמה שונה מהסיסמה לאתר הפרט וכן שיש להקפיד על אותיות גדולות וקטנות. 
                <br></br>
                במידה ולא הצלחת, ניתן לאפס את הסיסמה כאן: <a href="https://go.idf.il/sspr">https://go.idf.il/sspr</a> 
            </>
        }
    },
    {
        question: {
            icon: blockedUser,
            text: `
                התחברתי לחשבון Microsoft שלי וקיבלתי הודעה: "מצטערים, איננו מצליחים להכניס אותך". 
            `
        },
        answer: {
            text: `כנראה שניסית להתחבר עם חשבון Microsoft אישי או חשבון של ארגון אחר. יש להתחבר עם משתמש MY IDF בלבד.`
        }
    },
    {
        question: {
            icon: blockedUser,
            text: `אני לא יודע מה פרטי המשתמש שלי כדי להתחבר, איך אפשר לאפס?`
        },
        answer: {
            text: <>ניתן להתחבר ל- <a href="https://my.idf.il">https://my.idf.il</a> ולאפס את פרטי המשתמש. </>
        }
    },

]

export default faqs;