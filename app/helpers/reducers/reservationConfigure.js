import {
    RESET_RESERVATION,
    UPDATE_ADULTS,
    UPDATE_CHILDREN,
    UPDATE_DATE,
    UPDATE_DESCRIPTION,
    UPDATE_DONE,
    UPDATE_DRIVER_ID,
    UPDATE_TYPE,
} from "./names";

const initialState = {
    id: '',
    type: 0,
    driverid: '',
    date: '',
    description: '',
    adults: 0,
    children: 0,
    descriptionD: '',
    state: '',
    CreatedOrModified: '',
    done: false
}

const reservationConfigureReducer = (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_DATE:
            return {...state, date: action.payload.date}

        case UPDATE_DRIVER_ID:
            return {...state, driverid: action.payload.driverid}

        case UPDATE_ADULTS:
            return {...state, adults: action.payload.adults}

        case UPDATE_CHILDREN:
            return {...state, children: action.payload.children}

        case UPDATE_DESCRIPTION:
            return {...state, description: action.payload.description}

        case UPDATE_DONE:
            return {...state, done: true}

        case UPDATE_TYPE:
            return { ...state, type: action.payload.type}

        case RESET_RESERVATION:
            return initialState


        default:
            return state;
    }
}

export default reservationConfigureReducer;

