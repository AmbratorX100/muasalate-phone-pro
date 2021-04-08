import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducers from "../helpers/reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['toast']
}

const persistedReducer = persistReducer(persistConfig, rootReducers)


export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
