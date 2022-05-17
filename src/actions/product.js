import axios from '../helpers/axios';
import store from '../store/index';
import { productConstants } from './constants';

const getProducts = () => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
            let res = await axios.get('/product/getProducts');
            if (res.status == 200) {
                const { products } = res.data;
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: { products }
                });
            }
            else
                dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
        } catch (error) {
            console.log(error);
        }
    }
}

export const addProduct = (form) => {
    return async (dispatch) => {
        try {
            dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
            let res = await axios.post('/product/create', form);

            if (res.status == 201) {
                dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
                dispatch(getProducts());
            }
            else
                dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
        } catch (error) {
            console.log(error);
        }

    };
}

export const deleteProductByID = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.DELETE_BY_ID_REQUEST });
            let res = await axios.post('/product/deleteProductByID', payload);
            if (res.status == 202) {
                dispatch({ type: productConstants.DELETE_BY_ID_SUCCESS });
                dispatch(getProducts());
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.DELETE_BY_ID_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default getProducts;