import axios from '../helpers/axios';
import { categoryConstants } from './constants';

export const getAllCategories = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get('category/getcategory');
        // console.log(res);

        if (res.status === 200) {
            const {categoryList} = res.data;

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        }
        else 
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
    };
};

export const addCategory = (form) => {

    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    return async dispatch => {
        const res = await axios.post('/category/create', form)
            .catch(err => console.log(err));

        console.log(res);

        if (res.status === 201) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: res.data.category
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