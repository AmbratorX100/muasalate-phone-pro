import {
    LEAVE_ROOM, RESET_ROOM,
    SET_ROOMS,
    SET_UPDATE_ROOM,
    UPDATE_JOIN, UPDATE_MEMBERS_REFERENCE,

} from "./names";

const initialState = [


]


const haveSameData = function (obj1, obj2) {
    const obj1Length = Object.keys(obj1).length;
    const obj2Length = Object.keys(obj2).length;
    // console.log(obj2Length, obj1Length)
    if (obj1Length === obj2Length) {
        return Object.keys(obj1).map(key => {
            if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
                return haveSameData(obj1[key], obj2[key])
            } else {
                return obj1[key] === obj2[key]

            }
        });

    }
    return false;
}

const roomConfigureReducer = (state = initialState, action) => {

    switch (action.type) {


        case SET_UPDATE_ROOM:
            // console.log(state.length)
            let exists = -1
            state.map((room, i) => {
                if ( room.id === action.payload.room.id ) {
                    exists = i
                }
            })

            if (exists === -1) {
                return [...state, action.payload.room]
            } else if (haveSameData({...state[exists], joined: false, roomMembers: {}}, action.payload.room).includes(false)) {
                state[exists] = {...action.payload.room, joined: state[exists].joined, roomMembers: state[exists].roomMembers}
                return [ ...state]
            }
            return state

        case UPDATE_JOIN:

            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) {
                    console.log(`found in ${i}`)
                    state[i].joined = !state[i].joined
                    return [... state]
                }
            }
            return state


        case UPDATE_MEMBERS_REFERENCE:

            for (let i = 0; i < state.length; i++) {

                if (state[i].id === action.payload.membersReference.roomId) {
                    state[i].roomMembers = action.payload.membersReference
                    return [...state]
                }
            }

            return state

        case RESET_ROOM:
            return initialState;



        case LEAVE_ROOM:
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.roomId) {
                    state[i].joined = false
                    return [...state]
                }
            }
            return state

        default:
            return state;

    }

}

export default roomConfigureReducer;
