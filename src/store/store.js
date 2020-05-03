import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Reducers
import LayoutReducer from './reducers';

import thunk from 'redux-thunk';

// const initialState = {
//     layout:{},
//     auth:null,
// };

const rootReducers = combineReducers({
    store: LayoutReducer,
})

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
};

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['utilityLayout', 'serverStatus']
};
const pReducer = persistReducer(persistConfig, rootReducers);

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export const store = createStore(pReducer, composeEnhancers(applyMiddleware(logger, thunk)));
export const persistor = persistStore(store);
