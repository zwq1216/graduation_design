import {createStore} from 'redux';
import reducer from './reducer';
import Local from '../own/Local';
export const INIT_USER = 'INIT_USER';

export function makeStore() {
    return createStore(reducer, {
        userinfo: {
            username:Local.get("username",""),
            role:Number(Local.get("role","-1")),
            userid: Number(Local.get("userid", "-1"))
        },
    });
}