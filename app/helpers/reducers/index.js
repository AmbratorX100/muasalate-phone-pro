import markerReducer from'./marker'
import {combineReducers} from 'redux';
import mapConfigureReducer from "./mapConfigure";
import roomConfigureReducer from './RoomConfigure'
import reservationConfigureReducer from './reservationConfigure'
import settingsReducer from './settings'
import OrderConfigureReducer from "./OrdersConfigure";
import toastsConfigureReducer from "./toastsConfigure";
import TabBarConfigureReducer from "./tabBarConfigure";
import roomMembersConfigureReducer from "./roomMembersConfigure";

const rootReducers = combineReducers({
    Markers: markerReducer,
    mapConf: mapConfigureReducer,
    roomConf: roomConfigureReducer,
    reservationConf: reservationConfigureReducer,
    settingConf: settingsReducer,
    // ordersConf: OrderConfigureReducer,
    toast: toastsConfigureReducer,
    tabBarConf: TabBarConfigureReducer,
    roomMembersConf: roomMembersConfigureReducer
});


export default rootReducers;
