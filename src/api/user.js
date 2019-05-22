import * as API from '../constant/api';

export function getProfile() {
    return fetch(API.GET_PROFILE, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'your-token'
        }
    })
}