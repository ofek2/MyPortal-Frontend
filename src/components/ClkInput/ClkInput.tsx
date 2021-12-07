import { InputBase, InputBaseProps } from "@material-ui/core";
import './ClkInput.css';

export function ClkInput(props: InputBaseProps) {
	return <InputBase className="clk-input" {...props} />;
}