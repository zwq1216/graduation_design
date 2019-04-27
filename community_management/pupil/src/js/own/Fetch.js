import {
    FetchClient,
    Interceptor
} from 'intercept-fetch';
import { PubSub } from 'pubsub-js';
import Local from './Local';
import history from './history';
const Fetch = new FetchClient();

function getCookie(name) {
    if (!document.cookie) {
        return null;
    }
    const csrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));
    if (csrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(csrfCookies[0].split('=')[1]);
}
Fetch.setTimeout(100000)
const interceptor = new Interceptor({
    cors: {
        id: 0,
        request(url, config) {
            config.mode = 'cors';
            config.cache = 'no-cache';
            config.credentials = 'include';
            if (config.method === "POST") {
                if (config.body instanceof FormData) {
                    config.headers = {
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                } else {
                    config.headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                }
            }
            if (config.method === "PUT") {
                if (config.body instanceof FormData) {
                    config.headers = {
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                } else {
                    config.headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                }
            }
            if (config.method === "PATCH") {
                config.headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            }
            if (config.method === "DELETE") {
                config.headers = {
                    
                    'X-CSRFToken': getCookie('csrftoken')
                }
            }
            return Promise.resolve([url, config])
        },
        success(data) {
            return Promise.resolve(data);
        },
        error(res) {
            if (res.status === 403) {
                let init = {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'include'
                };
                fetch("/api/users/logout/", init).then((response) => {
                    return response.blog();
                }).then(mydata => {
                    PubSub.publish("alert", {
                        type: "error",
                        name: "会话超时，请重新登录"
                    })
                    Local.clear();
                    history.push("/");
                }).catch((res) => {
                    PubSub.publish("alert", {
                        type: "error",
                        name: "会话超时，请重新登录"
                    })
                    Local.clear();
                    history.push("/");
                });
            }
            return Promise.resolve(res);
        },
        timeout(url) {
            return Promise.resolve('timeout');
        }
    }
})

Fetch.setInterceptors(interceptor);
export default Fetch;