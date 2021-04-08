import {RESET_ROOM_MEMBERS, SET_ROOM_MEMBERS} from "./names";


const initialState = {}





const roomMembersConfigureReducer = (state = initialState, action) => {

    switch (action.type) {


        case SET_ROOM_MEMBERS: // can be optimized somehow
            console.log(action.payload.roomMembers)

            return action.payload.roomMembers

        case RESET_ROOM_MEMBERS:
            return initialState;


        default:
            return state
    }

}


export default roomMembersConfigureReducer;
