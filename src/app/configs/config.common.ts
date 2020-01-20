import { environment } from 'src/environments/environment';

// console.log('config mode in common config', environment.environmentName);

export const ASSET_PORT = '3000';
export const API_PORT = '4000';
export const LIVE_STREAM_PORT = '8000';

// const devMode = 'LOCAL';

const devMode = environment.environmentName;

const EVENTS = {
    PREMISE: {
        NEW_SERVER_EVENT : 'new_event_occurred',
        USER_JOINED_EVENT : 'user_joined'
    },
    LOCAL: {
        NEW_SERVER_EVENT : 'message',
        USER_JOINED_EVENT : 'message'
    },
    PROD: {
        NEW_SERVER_EVENT : 'new_event_occurred',
        USER_JOINED_EVENT : 'user_joined'
    }
};

export const SOCKET_EVENTS = EVENTS[devMode];
// console.log('socket event', SOCKET_EVENTS);
// console.log('devmode', devMode);
