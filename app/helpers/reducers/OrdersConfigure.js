import {RESET_ORDER} from "./names";

const initialState = []

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

const OrderConfigureReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'AddOrder':
            // check if room exists //
            if (state.length ) {
                // console.log('Not first order ')
                let foundRoom = state.filter((reservation) => reservation.id === action.payload.data.id)
                if (foundRoom.hasOwnProperty(0)) {
                    // console.log('Room in redux')
                    let foundReservation = state[state.indexOf(foundRoom[0])].reservation.filter((reserve) => reserve.id === action.payload.data.reservation[0].id)

                    if (foundReservation.hasOwnProperty(0)) { // if reservation id in redux
                        // console.log('Reservation in redux')

                        const isEqual = JSON.stringify(haveSameData(foundReservation[0], action.payload.data.reservation[0])).includes(false)


                        if (isEqual) { // if it changed
                            // console.log('Different status')
                            state[state.indexOf(foundRoom[0])].reservation[state[state.indexOf(foundRoom[0])].reservation.indexOf(foundReservation[0])] = {...action.payload.data.reservation[0], updated: true}
                            return [...state]

                        } else {
                            // console.log('Same Status')
                            state[state.indexOf(foundRoom[0])].reservation[state[state.indexOf(foundRoom[0])].reservation.indexOf(foundReservation[0])] = {...action.payload.data.reservation[0], updated: true}
                            return state;
                        }

                    } else {
                        // console.log('Order not in redux')
                        state[state.indexOf(foundRoom[0])].reservation.push({...action.payload.data.reservation[0], updated: true})
                        return [...state];
                    }

                }

            } else {
                // console.log('first order')
            }
            action.payload.data.reservation[0].updated = true
            return [...state, action.payload.data]


        case 'UpdateOrder': // TODO: You are here make sure to different between updated or not
            // console.log(state)
            if (state.length) {
                let newState = state.map(room => {
                    return room.reservation = room.reservation.map(reservation => {
                        return {...reservation, updated: false}
                    })
                })

                // console.log(newState)

            }
            return state;

        case 'UpdateStatus':
            state = state.map((room) => {
                room.reservation = room.reservation.map((reserve) => {
                    if (reserve.id === action.payload.id) {
                        reserve =  {...reserve, updated: action.payload.state}
                        if (action.payload.status !== undefined) {
                            return  {...reserve, state: action.payload.status}
                        }
                    }
                    return reserve
                })
                return room
            })





            return [...state]

        case RESET_ORDER:
            return initialState

        case 'ClearOrder':
            return []

        default:
            return state
    }
}

export default OrderConfigureReducer;
