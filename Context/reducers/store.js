import {createStore} from 'redux';
import myReducer from './index';

import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, myReducer);

let store = createStore(persistedReducer)
let persistor = persistStore(store)

export { store, persistor }
