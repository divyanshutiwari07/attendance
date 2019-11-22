const SERVER_URL = 'HTTP://192.168.0.16:';
const PORT = '4000';


export const config = {
  production: true,
  LOGIN_URL : SERVER_URL + PORT + '/awiros_ms/attendence/api/login',
  TODAYS_ATTENDANCE : SERVER_URL + PORT + '/awiros_ms/attendence/api/console_data',


  GET_JSON :`https://restcountries.eu/rest/v2/all`
};
