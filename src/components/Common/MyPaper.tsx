import React from 'react';
import { Paper } from '@material-ui/core';
import idfPng from '../../assets/images/idf.png';

export function MyPaper(props) {
    return (
        <Paper elevation={3} style={{ padding: "40px 0px", position: "relative", borderRadius: 30 }} >
            <img src={idfPng} className="idf-icon"/>
            {props.children}
        </Paper>
    );
}