import packageJson from '../package.json';

const productionURL = 'https://mncntrl.ru';
const apiURL = '/api/v1';
const configuredURL = process.env.EXPO_PUBLIC_API_URL || productionURL;

export const url = configuredURL.replace(/\/+$/, '');
export const endpointAPI = `${url}${apiURL}`;

export const APP_VERSION = packageJson.version;
