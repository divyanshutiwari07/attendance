const SERVER_URL = 'HTTP://192.168.0.16:';
const PORT = '4000';

// export const config = {
//   TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data',
//   LOGIN_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/login',
//   REGISTER_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/register_user_for_attendence'
// };

// +++++++++++++++++++++++++++++++++++++++++


const LOCAL_HOST_SERVER = 'http://localhost:3000';

// const devMode = "ON_PREMISE";
const devMode = 'LOCALHOST';
// const devMode = "PRODUCTION";

const configs = {
  ON_PREMISE: {
    TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data',
    LOGIN_URL : SERVER_URL + PORT + '/login'
  },
  LOCALHOST: {
    TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
    LOGIN_URL: LOCAL_HOST_SERVER + '/login',
    REGISTER_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
    YEARLY_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/register_user_for_attendence'
  },
  PRODUCTION: {
    TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data'
  }
}

export const config = configs[devMode];
