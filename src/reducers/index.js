import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './user';
import productReducer from './product';
import orderReducer from './order';
import categoryReducer from './category';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer
});

export default rootReducer;