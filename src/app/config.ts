const SERVER_URL = 'http://192.168.0.16:';
const _PORT = '4000';
const PORT = '3000';

const devMode = 'ON_PREMISE';
// let devMode = 'LOCALHOST';
// const devMode = "PRODUCTION";

export const LOCAL_HOST_SERVER = 'http://localhost:3000';

export const SOCKET_EVENTS = {
  NEW_SERVER_EVENT : devMode === 'ON_PREMISE' ? 'new_event_occurred' : 'message',
  USER_JOINED_EVENT : devMode === 'ON_PREMISE' ? 'user_joined' : 'message'
};

const configs = {
  ON_PREMISE: {
    SERVER_ADDRESS_REALTIME : 'http://192.168.0.16:3000',
    SERVER_ADDRESS : '192.168.0.16',
    SERVER_ADDRESS_FOR_REGISTER : 'http://192.168.0.16:',
    PORT : PORT,
    TODAYS_ATTENDANCE : SERVER_URL + _PORT + '/awiros_ms/attendence/api/console_data',
    LOGIN_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/login',
    REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
    LIST_OF_REGISTER_URL : SERVER_URL + _PORT + '/awiros_ms/attendence/api/list_of_registered_users',
  },
  LOCALHOST: {
    SERVER_ADDRESS_REALTIME : LOCAL_HOST_SERVER,
    SERVER_ADDRESS : '192.168.0.16',
    SERVER_ADDRESS_FOR_REGISTER : 'http://192.168.0.16:',
    PORT : PORT,
    TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
    LOGIN_URL: LOCAL_HOST_SERVER + '/login',
    REGISTER_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
    LIST_OF_REGISTER_URL : LOCAL_HOST_SERVER + '/list_of_registered_users',
  },
  PRODUCTION: {
    TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data'
  }
};

export const config = configs[devMode];
