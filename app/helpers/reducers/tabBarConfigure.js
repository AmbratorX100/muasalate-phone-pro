import {RESET_TAB_BAR, UPDATE_IS_OPEN} from "./names";

const initialState = {
    isOpen: false
}


const TabBarConfigureReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_IS_OPEN:
            console.log(action.payload.open)
            return {...state, isOpen: action.payload.open}

        case RESET_TAB_BAR:
            return initialState

        default:
            return state
    }
}
export default TabBarConfigureReducer;
