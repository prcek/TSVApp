import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/es/storage';
import { AsyncStorage } from 'react-native'

const redux_state_version = 1;
const psconfig = {
    key: 'root_tsvapp',
    storage:AsyncStorage,
    blacklist: ['server'], 
    version:redux_state_version,
    migrate: (state) => {
        if (state===undefined) return Promise.resolve({});
        if ((state._persist) && (state._persist.version<redux_state_version)) {
            console.log("redux state reset");
            return Promise.resolve({})
        } else {
            return Promise.resolve(state)
        }
    }
}
const preducer = persistReducer(psconfig, reducer)

const store = createStore(preducer);

const persistor = persistStore(store);


export {
    store,
    persistor
}