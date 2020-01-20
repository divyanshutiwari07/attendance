import * as COMMON from './config.common';

const SERVER_URL = 'http://192.168.0.80' + ':';

const API_URLS = {
    LOGIN_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/login',
    TODAYS_ATTENDANCE : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/console_data',
    LIST_OF_REGISTER_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/list_of_registered_users',
    REGISTER_URL : SERVER_URL + COMMON.API_PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
};

export const config = {
    SERVER_ADDRESS_REALTIME : 'http://192.168.0.80:3000',
    SERVER_ADDRESS : '192.168.0.80',
    PORT : COMMON.ASSET_PORT,
    ...API_URLS
};


