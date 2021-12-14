import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import IMessageAlert from "./IMessageAlert";

interface MessageAlertProps {
    alert?: IMessageAlert
}
export function MessageAlert(props: MessageAlertProps) {
    const {alert} = props;

    return (
        <Grid item xs={12}>
				{
					alert && alert.msg !== '' ?
						<Alert severity={alert.severity} className="info-container">
							{alert.msg}
						</Alert> :
						<></>
				}
        </Grid>
    )
}