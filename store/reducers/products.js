import COURSES from '../../data';
import { CREATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Courses from '../../model';

const initialState = {
    availableProducts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return {
                availableProducts: action.products,
            };
        case CREATE_PRODUCT: 
            const newProduct = new Courses(
                action.productData.id, 
                action.productData.subscriberId,
                action.productData.title,
                action.productData.videoUrl,
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
            }
    }
    return state;
};