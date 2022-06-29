
import config from "../../model/configuration/Configuration";
import { GRAPH_REQUEST, LOGIN_REQUEST, CLICK_API_REQUEST } from "../../model/configuration/GraphRequestsConfig";
import { BrowserAuthError, PublicClientApplication } from '@azure/msal-browser';

let msalConf = config.msalConfig;
msalConf.auth.redirectUri = window.location.href + config.msalConfig.auth.redirectUri;
msalConf.auth.postLogoutRedirectUri = window.location.href;
let msalObj = new PublicClientApplication(msalConf);

async function handleRedirect() {
	const tokenResponse = await msalObj.handleRedirectPromise();
	// const accountObj = tokenResponse ? tokenResponse.account : msalObj.getAccount();
	const accountObj = tokenResponse && tokenResponse.account;
	if (accountObj) {
		msalObj.setActiveAccount(accountObj);
		// Account object was retrieved, continue with app progress
		// console.log('id_token acquired at: ' + new Date().toString());
	} else if (tokenResponse && tokenResponse.tokenType === "Bearer") {
		// No account object available, but access token was retrieved
		// console.log('access_token acquired at: ' + new Date().toString());
	} else if (tokenResponse === null) {
		throw new Error("tokenResponse was null, attempt sign in or enter unauthenticated state for app\"");
	} else {
		throw new Error("tokenResponse was not null but did not have any tokens: " + tokenResponse);
	}

}
const MsService = {
	handleRedirect,
	getAccessToken: async () => {
		try {
			const token = await msalObj.acquireTokenSilent(GRAPH_REQUEST);

			return JSON.stringify({
				accessToken: token.accessToken,
				userName: token.account ? token.account.username : null
			});
		} catch (err) {
			throw err;
		}
	},
	getClickApiToken: async () => {
		try {
			const token = await msalObj.acquireTokenSilent(CLICK_API_REQUEST);
			return token;
		} catch (err) {
			throw err;
		}
	},
	login: async (loginHint?) => {
		const request = { ...LOGIN_REQUEST, loginHint };

		try {
			await msalObj.loginRedirect(request);
		} catch (err) {
			if (err instanceof BrowserAuthError) {
				// cleaning session in order to initiate another interactive login window
				sessionStorage.clear();
				localStorage.clear();
				await msalObj.loginRedirect(request);
			} else {
				throw err;
			}
		}

		return false; // when we use login pop up we need to redirect the user after successful login
	},
	getAccount: () => {
		const accounts = msalObj.getAllAccounts();
		return accounts && accounts.length > 0 ? accounts[accounts.length - 1] : null;	// return the most recent connected user
	},
	logout: () => {
		msalObj.logout();
	}
};

export default MsService;