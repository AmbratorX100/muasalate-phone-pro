import {RESET_MAP, UPDATE_CAMERA} from "./names";

const initialState = {
    // Camera: null
}

const mapConfigureReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_CAMERA:
            return {...state, Camera: action.payload.camera}


        case RESET_MAP:
            return initialState


        default:
            return state;
    }

}

export default mapConfigureReducer;
