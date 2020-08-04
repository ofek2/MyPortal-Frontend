import * as _ from 'lodash';
import * as config from '../../configuration.json';
console.log(process.env.REACT_APP_ENVIRONMENT)
const defaultConfig = config.development;
const environment = process.env.REACT_APP_ENVIRONMENT || 'development';
const envConf = config[environment];
const finalConf = _.merge(defaultConfig, envConf);

export default finalConf;