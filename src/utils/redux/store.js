import { createStore, combineReducers} from 'redux'
import  postReducer  from './posts/postReducer'
import { userReducer } from './users/userReducer';
import spinnerReducer from './spinner/spinnerReducer';

const rootReducer = combineReducers({
    users: userReducer,
    posts: postReducer,
    spinner: spinnerReducer
})
 const store = createStore(rootReducer)

export default store;