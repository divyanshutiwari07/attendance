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
    VERIFY_EMPLOYEE_PRESENCE_URL: SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/update_label',
    LIST_OF_SOURCES_URL: SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/list_of_sources',
    REJECT_ATTENDANCE_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/reject_user_attendence'
};

export const config = {
    SERVER_ADDRESS_REALTIME : WINDOW_HTTP + '//' + WINDOW_URL + ':' + SOCKET_PORT,
    SERVER_ADDRESS : WINDOW_URL,
    PORT : COMMON.ASSET_PORT,
    LIVE_STREAM_CAMERA_URL: WINDOW_HTTP + '//' + WINDOW_URL + ':',
    LIVE_STREAM_PORT: COMMON.LIVE_STREAM_PORT,
    ...API_URLS
};
