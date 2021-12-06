import { InputBase, InputBaseProps } from "@material-ui/core";
import React from "react";
import './ClkInput.css';

export function ClkInput(props: InputBaseProps) {
	return <InputBase className="clk-input" {...props} />;
}