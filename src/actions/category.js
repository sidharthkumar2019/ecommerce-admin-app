import axios from '../helpers/axios';
import { categoryConstants } from './constants';
import store from '../store/index';

const getAllCategories = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        console.log(res);
        if (res.status === 200) {

            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}

export const addCategory = (form) => {

    return async (dispatch) => {

        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post('/category/create', form, {
            headers: {
                // I am passing the Authorization header here again
                // (already sent in ./helpers/axio.js) because sometimes
                //  store.getState().auth.token returned null
                'Authorization': `Bearer ${store.getState().auth.token}`
            }
        })
            .catch(err => console.log(err));

        if (res.status === 201) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: {category: res.data}
            })
        }
        else {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error
            })
        }
    };
}

export const updateCategories = (form) => {

    return async (dispatch) => {
        dispatch({type: categoryConstants.UPDATE_CATEGORIES_REQUEST});
        const res = await axios.post('/category/update', form, {
            headers: {
                // I am passing the Authorization header here again
                // (already sent in ./helpers/axio.js) because sometimes
                //  store.getState().auth.token returned null
                // 'Authorization': `Bearer ${store.getState().auth.token}`
            }
        })
            .catch(err => console.log(err));

        if (res.status === 201) {
            dispatch({type: categoryConstants.UPDATE_CATEGORIES_SUCCESS})
            dispatch(getAllCategories());
        }
        else {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {error: res.data.error}
            })
        }

        console.log(res);
    };
}

export const deleteCategories = (ids) => {

    return async (dispatch) => {
        if (ids.length == 0) return;

        dispatch({type: categoryConstants.DELETE_CATEGORIES_REQUEST});
        const res = await axios.post('/category/delete', {
            payload: { ids }
        }, {
            headers: {
                // I am passing the Authorization header here again
                // (already sent in ./helpers/axio.js) because sometimes
                //  store.getState().auth.token returned null
                // 'Authorization': `Bearer ${store.getState().auth.token}`
            }
        })
            .catch(err => console.log(err));

        if (res.status === 200) {
            dispatch(getAllCategories());
            dispatch({type: categoryConstants.DELETE_CATEGORIES_SUCCESS});
        }
        else {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: {error: res.data.error}
            })
        }
    };
}

export {
    getAllCategories
};