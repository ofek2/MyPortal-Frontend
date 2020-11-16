import * as _ from 'lodash';
import * as config from '../../configuration.json';

const defaultConfig = config.development;
const environment = process.env.REACT_APP_ENVIRONMENT || 'development';
const envConf = config[environment];
let finalConf = _.merge(defaultConfig, envConf);

// setting secrets from env variable
if (environment != 'development') {
    console.log(process.env.REACT_APP_CHECKSUM_SECRET)
    finalConf["responseSecret"] = process.env.REACT_APP_CHECKSUM_SECRET;
}

export default finalConf;