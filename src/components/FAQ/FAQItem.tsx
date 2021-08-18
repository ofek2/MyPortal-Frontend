import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import faqs, {FAQ} from '../../model/data/FAQs';
import './FAQItem.css';

interface FAQProps {
    faq: FAQ
}

function FAQItem(props: FAQProps) {
    const {faq} = props;

    const questionText = <>
        {faq.question.text.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
        })}
    </>

    const answerText = <>
        {faq.answer.text.split("\n").map((i, key) => {
            return <div key={key}>{i}</div>;
        })}
    </>

    return (
        <div className="faq-container">
           <div className="faq-inner">
                <div className="faq-front">
                    <Grid container style={{height: "100%"}} justify="center" alignItems="flex-start">
                        <Grid container justify="center" alignItems="center" item xs={12}  className="faq-front-icon"><img src={faq.question.icon}/></Grid>
                        <Grid container justify="center" alignItems="center" item xs={12} className="faq-front-question">
                            <Typography className="faq-front-text">{questionText}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="faq-back">
                    <Grid container  justify="center" alignItems="flex-start">
                        {/* <Grid container justify="center" alignItems="center" item xs={12} className="faq-back-question"> */}
                            <Typography className="faq-back-question faq-back-question-text">{questionText}</Typography>
                        {/* </Grid> */}
                        {/* <Grid container justify="center" alignItems="center" item xs={12} className=""> */}
                            <Typography className="faq-back-answer faq-back-answer-text">{answerText}</Typography>
                        {/* </Grid> */}
                    </Grid>
                </div>
            </div> 
        </div>
    )
}

export default FAQItem;