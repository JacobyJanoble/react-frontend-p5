import { combineReducers } from 'redux'
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import channelReducer from './reducers/channelReducer';

const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer,
    channels: channelReducer
});

export default rootReducer;