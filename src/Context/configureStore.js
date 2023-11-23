// configureStore.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = configureStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}