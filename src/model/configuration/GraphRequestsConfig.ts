import config from "./Configuration";

export const GRAPH_REQUEST = {
	scopes: ["user.read"]

};
export const LOGIN_REQUEST = {
	prompt: "login",
	scopes: config.msalScopes
};
export const CLICK_API_REQUEST = {
	scopes: config.clickApiScopes
};