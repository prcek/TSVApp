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
        //console.log("STORE MIGRATION STEP",state);
        //TODO clean old auth
        console.log("XXXXX STORE XXXXX")
        if (state===undefined) return Promise.resolve({});
        if ((state._persist) && (state._persist.version<redux_state_version)) {
            console.log("redux state reset");
            return Promise.resolve({})
        } else {
            if (state.auth  && state.auth.ok) {
                console.log("STORE RECOVERY AUTH",state.auth);
                if (state.auth.user && state.auth.user.exp) {
                    var now = new Date().getTime();
                    var left = state.auth.user.exp*1000-now;
                    console.log("STORE AUTH time now",now," exp", state.auth.user.exp," min left",left/60000);
                    if (left<60000) {
                        state.auth.ok=false;
                        console.log("CLEAR AUTH"); 
                    }
                } else {
                    console.log("CLEAR AUTH");
                    state.auth.ok=false;
                }
            } else {

                console.log("NO AUTH");
            }
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