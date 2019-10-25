import {combineReducers} from 'redux';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import comandaReducer from './comanda/comanda.reducer';

const persistConfig={
    key:'root',
    storage,
    whitelist:['user']
}

const rootReducer=combineReducers({
    user:userReducer,
    comanda:comandaReducer
})

export default persistReducer(persistConfig, rootReducer);