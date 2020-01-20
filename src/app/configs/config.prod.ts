import * as COMMON from './config.common';

// console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const WINDOW_HTTP = location.protocol;
const WINDOW_URL = location.hostname;
const SERVER_URL = WINDOW_HTTP + '//' + WINDOW_URL + ':';
const SOCKET_PORT = '3000';

const API_URLS = {
    LOGIN_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/login',
    TODAYS_ATTENDANCE : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/console_data',
    LIST_OF_REGISTER_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/list_of_registered_users',
    REGISTER_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
};

export const config = {
    SERVER_ADDRESS_REALTIME : WINDOW_HTTP + '//' + WINDOW_URL + ':' + SOCKET_PORT,
    SERVER_ADDRESS : WINDOW_URL,
    PORT : COMMON.ASSET_PORT,
    ...API_URLS
};
