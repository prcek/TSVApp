import { combineReducers } from 'redux'

import auth from './auth';
import server from './server';

const reducers = combineReducers({
    auth,server
})
  
export default reducers