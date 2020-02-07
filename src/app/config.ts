// const WINDOW_HTTP =    location.protocol;
// const WINDOW_URL =     location.hostname;

// const SERVER_URL = 'http://192.168.0.80:';
// // const SERVER_URL = WINDOW_HTTP + '//' + WINDOW_URL + ':';
// const _PORT = '4000';
// const PORT = '3000';

// const devMode = 'ON_PREMISE';
// // let devMode = 'LOCALHOST';
// // let devMode = 'PRODUCTION';

// export const LOCAL_HOST_SERVER = 'http://localhost:3000';

// export const SOCKET_EVENTS = {
//   NEW_SERVER_EVENT : devMode === 'ON_PREMISE' ? 'new_event_occurred' : 'message',
//   USER_JOINED_EVENT : devMode === 'ON_PREMISE' ? 'user_joined' : 'message'

//   // NEW_SERVER_EVENT : devMode === 'PRODUCTION' ? 'new_event_occurred' : 'message',
//   // USER_JOINED_EVENT : devMode === 'PRODUCTION' ? 'user_joined' : 'message'
// };

// const configs = {
//   ON_PREMISE: {
//     SERVER_ADDRESS_REALTIME : 'http://192.168.0.80:3000',
//     SERVER_ADDRESS : '192.168.0.80',
//     SERVER_ADDRESS_FOR_REGISTER : 'http://192.168.0.80:',

//     PORT : PORT,
//     TODAYS_ATTENDANCE : SERVER_URL + _PORT + '/awiros_ms/attendence/api/console_data',
//     LOGIN_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/login',
//     REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
//     LIST_OF_REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/list_of_registered_users',
//   },
//   LOCALHOST: {
//     SERVER_ADDRESS_REALTIME : LOCAL_HOST_SERVER,
//     SERVER_ADDRESS : '192.168.0.16',
//     SERVER_ADDRESS_FOR_REGISTER : 'http://192.168.0.16:',

//     PORT : PORT,
//     TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
//     LOGIN_URL: LOCAL_HOST_SERVER + '/login',
//     REGISTER_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
//     LIST_OF_REGISTER_URL : LOCAL_HOST_SERVER + '/list_of_registered_users',
//   },
//   PRODUCTION: {
//     SERVER_ADDRESS_REALTIME : WINDOW_HTTP + '//' + WINDOW_URL + ':' + PORT,
//     SERVER_ADDRESS : WINDOW_URL,
//     SERVER_ADDRESS_FOR_REGISTER : WINDOW_HTTP + '//' + WINDOW_URL + ':',

//     PORT : PORT,
//     TODAYS_ATTENDANCE : SERVER_URL + _PORT + '/awiros_ms/attendence/api/console_data',
//     LOGIN_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/login',
//     REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
//     LIST_OF_REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/list_of_registered_users',
//   }
// };

// export const config = configs[devMode];


import { environment } from 'src/environments/environment';
import * as LOCAL_CONFIG from './configs/config.local';
import * as PREMISE_CONFIG from './configs/config.premise';
import * as PROD_CONFIG from './configs/config.prod';
export * from './configs/config.common';

const CONFIGS = {
  LOCAL_CONFIG,
  PREMISE_CONFIG,
  PROD_CONFIG
};

// console.log('config mode', environment.environmentName);
const mode = environment.environmentName + '_CONFIG';

export const config = CONFIGS[mode].config;
