const SERVER_URL = 'HTTP://192.168.0.16:';
const _PORT = '4000';
const PORT = '3000';

export const config = {
  SERVER_ADDRESS : '192.168.0.16',
  SERVER_ADDRESS_FOR_REGISTER : 'HTTP://192.168.0.16:',
  PORT : PORT,
  TODAYS_ATTENDANCE : SERVER_URL + _PORT + '/awiros_ms/attendence/api/console_data',
  LOGIN_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/login',
  REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
  LIST_OF_REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/list_of_registered_users',
};

// +++++++++++++++++++++++++++++++++++++++++


// const LOCAL_HOST_SERVER = 'http://localhost:3000';

// // const devMode = "ON_PREMISE";
// const devMode = 'LOCALHOST';
// // const devMode = "PRODUCTION";

// const configs = {
//   ON_PREMISE: {
//     TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data',
//     LOGIN_URL : SERVER_URL + PORT + '/login'
//   },
//   LOCALHOST: {
//     SERVER_ADDRESS : '192.168.0.16',
//     SERVER_ADDRESS_FOR_REGISTER : 'HTTP://192.168.0.16:',
//     PORT : PORT,
//     TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
//     LOGIN_URL: LOCAL_HOST_SERVER + '/login',
//     REGISTER_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
//     LIST_OF_REGISTER_URL : LOCAL_HOST_SERVER + '/list_of_registered_users',
//   },
//   PRODUCTION: {
//     TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data'
//   }
// };

// export const config = configs[devMode];
