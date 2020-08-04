import React from 'react';
import './LoadingButton.css';
import {  Button, ButtonProps, CircularProgress } from '@material-ui/core';

interface ILoadingButtonProps { 
    isLoading: boolean
}

function LoadingButton(props: ILoadingButtonProps & ButtonProps) {
	// State & props
	const { children, isLoading, ...other } = props;

	// Rendering
	return (
		<div style={{position: "relative"}}>
            <Button disabled={isLoading} {...other}>{children}</Button>
            {isLoading && <CircularProgress size={24} className="button-progress" />}
        </div>
	);
}

export default LoadingButton;