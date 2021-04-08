import {RESET_SETTING, UPDATE_USER_INFO} from "./names";


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: 0,
    accountType: false,
    avatar: '',
    CountryInfo: {
        code: '',
        name: '',
        phoneCode: ''
    },
    CreatedOrModified: ''
}


const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            return { ...action.payload.userInfo, CreatedOrModified: new Date()}



        case RESET_SETTING:
            return initialState;
        default:
            return state;
    }
}
//


export default settingsReducer;
