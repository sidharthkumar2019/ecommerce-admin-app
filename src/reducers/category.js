import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (parentID, categories, category) => {
    let newCategories = [];

    if (parentID == undefined) {
        return [
            ...categories,
            {
                id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for (let ele of categories) {
        if (ele._id == parentID) {
            const newCategory = {
                id: category._id,
                name: category.name,
                slug: category.slug,
                parentID: category.parentID,
                children: []
            };
            newCategories.push({
                ...ele,
                children: ele.children ? [...ele.children, newCategory] : [newCategory]
            });
        }
        else {
            newCategories.push({
                ...ele,
                children: (ele.children && ele.children.length > 0) ? buildNewCategories(parentID, ele.children, category) : []
            });
        }
    }

    return newCategories;
}

export default (state=initialState, action) => {
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;

        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;

            let newCategories = buildNewCategories(category.parentID, state.categories, category);

            state = {
                ...state,
                categories: newCategories,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE: 
            state = {
                ...initialState
            }
            break;

        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state = {
               ...state,
               error: action.payload.error 
            }
            break;
    }

    return state;
}