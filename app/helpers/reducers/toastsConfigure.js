import {RESET_TOAST} from "./names";

const initialState = []

const toastsConfigureReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AddToast':
            return [...state, {msg: action.payload.message, key: Math.trunc(Math.random() * 10000), done: false}];


        case 'RemoveToast':
            // temp fix remove from blacklist
            let found = state.filter(msg => msg.key === action.payload.key)
            state[state.indexOf(found[0])].done = true
            return state
        case 'ClearToast':
            return [];


        case RESET_TOAST:
            return initialState;


        default:
            return state;
    }
}

export default toastsConfigureReducer;
