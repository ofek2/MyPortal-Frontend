import config from '../model/configuration/Configuration';
export const idToUpn = (id) => `${id}@${config.clickDomain}`