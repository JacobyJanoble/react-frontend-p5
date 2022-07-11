import { combineReducers } from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import channelReducer from './channelReducer'

const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer,
    channels: channelReducer
});

export default rootReducer;