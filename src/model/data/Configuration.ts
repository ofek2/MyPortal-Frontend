import * as _ from 'lodash';
import * as config from '../../configuration.json';

const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const envConf = config[environment];
const finalConf = _.merge(defaultConfig, envConf);

export default finalConf;