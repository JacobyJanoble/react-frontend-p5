// import { createStore } from 'redux'
// import channelReducer from './reducers/channelReducer';
// import rootReducer from './reducers/index'
// import postReducer from './reducers/postReducer';
// import userReducer from './reducers/userReducer';


// export function configureStore() {
//     return createStore(
//         rootReducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );
// }

// const store = configureStore()


// export default store

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
