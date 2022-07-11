import { createStore } from 'redux'
import rootReducer from './reducers/index'

export function configureStore() {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSIONS_ && window.__REDUX_DEVTOOLS_EXTENSIONS_()
    );
}

const store = configureStore()

export default store

