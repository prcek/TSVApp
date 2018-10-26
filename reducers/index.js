import { combineReducers } from 'redux'

import auth from './auth';
import server from './server';
import event from './event';

const reducers = combineReducers({
    auth,server,event
})
  
export default reducers