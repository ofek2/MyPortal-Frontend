import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import faqs, {FAQ} from '../../model/data/FAQs';
import './FAQItem.css';

interface FAQProps {
    faq: FAQ
}

function FAQItem(props: FAQProps) {
    const {faq} = props;

    // const questionText = <>
    //     {faq.question.text.split("\n").map((i, key) => {
    //         return <div key={key}>{i}</div>;
    //     })}
    // </>

    // const answerText = <>
    //     {faq.answer.text.split("\n").map((i, key) => {
    //         return <div key={key}>{i}</div>;
    //     })}
    // </>

    return (
        <div className="faq-container">
           <div className="faq-inner">
                <div className="faq-front">
                    <Grid container style={{height: "100%"}} justifyContent="center" alignItems="flex-start">
                        <Grid container justifyContent="center" alignItems="center" item xs={12} style={{height: "40%"}} className="faq-front-icon">
                            {typeof faq.question.icon == "string" ? <img src={faq.question.icon}/> : faq.question.icon}</Grid>
                        <Grid container justifyContent="center" alignItems="center" item xs={12} className="faq-front-question">
                            <Typography variant="body2" className="faq-front-text">{faq.question.text}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="faq-back">
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        {/* <Typography className="faq-back-question faq-back-question-title">הבעיה:</Typography> */}
                        <Typography className="faq-back-question faq-back-question-text">{faq.question.text}</Typography>
                        {/* <Typography className="faq-back-answer faq-back-answer-title">הפתרון:</Typography> */}
                        <Typography className="faq-back-answer faq-back-answer-text">{faq.answer.text}</Typography>
                    </Grid>
                </div>
            </div> 
        </div>
    )
}

export default FAQItem;