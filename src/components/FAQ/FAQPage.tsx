import { Container, Grid, Typography } from '@material-ui/core';
import { MyPaper } from '../Common/MyPaper';
import faqs from '../../model/data/FAQs';
import FAQItem from './FAQItem';

function FAQPage() {

    return (
        <MyPaper>
            <Typography variant="h3">נתקלת בבעיה? <b>ננסה לעזור לך</b> </Typography>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center" style={{marginTop: "20px", marginBottom: "20px"}}>
                {
                    faqs.map((faq, index) => 
                        <Grid key={index} container item alignItems="center" justifyContent="center" xs={12} md={6} lg={4}><FAQItem faq={faq}/></Grid>
                    )
                }
                </Grid>
            </Container>
        </MyPaper>
    )
}

export default FAQPage;