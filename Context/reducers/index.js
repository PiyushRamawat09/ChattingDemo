import {combineReducers} from 'redux';
import userAuthReducere from './UserReducer';

const myReducer = combineReducers({
    user : userAuthReducere
})

export default myReducer;