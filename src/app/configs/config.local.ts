import * as COMMON from './config.common';

const LOCAL_API_PORT = '3000';

export const LOCAL_HOST_SERVER = 'http://localhost:' + LOCAL_API_PORT;

export const config = {
    LOGIN_URL : LOCAL_HOST_SERVER + '/login',
    SERVER_ADDRESS: '',
    PORT : '',
    SERVER_ADDRESS_REALTIME : LOCAL_HOST_SERVER,
    TODAYS_ATTENDANCE : LOCAL_HOST_SERVER + '/employee-attendance',
    LIST_OF_REGISTER_URL : LOCAL_HOST_SERVER + '/list_of_registered_users',
    REGISTER_URL : LOCAL_HOST_SERVER + COMMON.API_PORT + '/awiros_ms/attendence/api/register_user_for_attendence',
    REJECT_ATTENDANCE_URL : LOCAL_HOST_SERVER + '/rejectAttendance'
};