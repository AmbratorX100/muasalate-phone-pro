import {
    ADD_MARKERS,
    REMOVE_MARKER,
    UPDATE_FIRST,
    UPDATE_LAST,
} from "./names";

const initialState = [
    // {
    //     label: '',
    //     location: {
    //         latitude: null,
    //         longitude: null
    //     }
    // }

];


const markerReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_MARKERS:
            // stop dub
            console.log(action.payload)

            const exists = state.filter(marker => marker.location.latitude === action.payload.location.latitude && marker.location.longitude === action.payload.location.longitude).length > 0

            return !exists ? [...state, {location: action.payload.location, label: action.payload.label}] : state.filter(marker => marker.location.latitude !== action.payload.location.latitude && marker.location.longitude !== action.payload.location.longitude)


        case UPDATE_FIRST:
            state[0] = {location: action.payload.location, label: action.payload.label}
            return [...state]

        case UPDATE_LAST:
            state[state.length ===1 ? 1 : state.length - 1] = {location: action.payload.location, label: action.payload.label}
            return [...state]

        case REMOVE_MARKER:
            console.log('removed1')


            return state.filter(marker => marker.location.latitude !== action.payload.location.latitude && marker.location.longitude !== action.payload.location.longitude)



        default:
            return state
    }
}

export default markerReducer;



















//
// const initialState = [
//
// ]
//
// const markerReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "AddMarker":
//             return [
//                 ...state,
//                 {
//                     id: state.length === 0 ? 0 : Math.max(...state.map(o=>o.id))+1,
//                     lat: action.payload.lat,
//                     lng: action.payload.lng,
//                     time: action.payload.time,
//                     color: action.payload.color,
//                     markerinfo: action.payload.markerinfo
//                 }
//             ]
//         case "ClearMarker":
//             if (action.hasOwnProperty('payload')) { //todo: improve
//                 return state.slice(action.payload.start, action.payload.end)
//             }
//             return [];
//
//         case "RemoveMarker":
//
//             return state.filter(marker => marker.id !== action.payload.id);
//
//         case "ClearMarkers":
//             return [];
//         default:
//             return state;
//     }
// }
// export default markerReducer;
