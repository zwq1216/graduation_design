export default function reducer(state, action) {
    switch(action.type) {
        case 'INIT_USER': {
            return {
                ...state,
                userinfo: action.userinfo,
            };
        }
    }
       
       
}