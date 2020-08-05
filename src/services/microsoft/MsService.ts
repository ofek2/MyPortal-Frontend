
import config from "../../model/data/Configuration";
import { GRAPH_REQUEST, LOGIN_REQUEST } from "../../model/data/Constants";
import { PublicClientApplication } from '@azure/msal-browser';

let msalObj = new PublicClientApplication(config.msalConfig);

async function handleRedirect() {
	const tokenResponse = await msalObj.handleRedirectPromise();
	const accountObj = tokenResponse ? tokenResponse.account : msalObj.getAccount();

	if (accountObj) {
		// Account object was retrieved, continue with app progress
		// console.log('id_token acquired at: ' + new Date().toString());
	} else if (tokenResponse && tokenResponse.tokenType === "Bearer") {
		// No account object available, but access token was retrieved
		console.log('access_token acquired at: ' + new Date().toString());
	} else if (tokenResponse === null) {
		throw new Error("tokenResponse was null, attempt sign in or enter unauthenticated state for app\"");
	} else {
		throw new Error("tokenResponse was not null but did not have any tokens: " + tokenResponse);
	}

}
export default {
	handleRedirect,
	getAccessToken: async () => {
		try {
			const token = await msalObj.acquireTokenSilent(GRAPH_REQUEST);

			return JSON.stringify({
				accessToken: token.accessToken,
				userName: token.account.userName
			});
		} catch (err) {
			throw err;
		}
	},
	login: async (loginHint?) => {
		const request = { ...LOGIN_REQUEST, loginHint };

		try {
			await msalObj.loginRedirect(request);
		} catch (err) {
			throw err;
		}

		return false; // when we use login pop up we need to redirect the user after successful login
	},
	getAccount: () => {
		return msalObj.getAccount();
	},
	logout: () => {
		msalObj.logout();
	}
};