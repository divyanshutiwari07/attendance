const SERVER_URL = 'HTTP://192.168.0.16';
const PORT = '4000';


export const config = {
  production: true,
  LOGIN_URL : SERVER_URL + ':' + PORT + '/awiros_ms/attendence/api/login',
  GET_JSON :`https://restcountries.eu/rest/v2/all`
};
