import axios from '../helpers/axios';
import store from '../store/index';

export const addProduct = (form) => {
    return async (dispatch) => {
        const res = await axios.post('/product/create', form, {
            headers: {
                // I am passing the Authorization header here again
                // (already sent in ./helpers/axio.js) because sometimes
                //  store.getState().auth.token returned null
                // 'Authorization': `Bearer ${store.getState().auth.token}`
            }
        })
        .catch(err => console.log(err));

        console.log(res);        
    };
}