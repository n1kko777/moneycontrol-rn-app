import packageJson from '../package.json';

const localhost = 'https://mncntrl.ru';

const apiURL = '/api/v1';

export const url = `${localhost}`;
export const endpointAPI = `${url}${apiURL}`;

export const APP_VERSION = packageJson.version;
