import Product from '../../model';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => { 
        //any async code
        const response = await fetch('https://practice1-78cf4-default-rtdb.firebaseio.com/products.json');

        const resData = await response.json();
        const loadedProducts = [];

        for (const key in resData) {
            loadedProducts.push(new Product(
                key, 
                resData[key].subscriberId,
                resData[key].title,
                resData[key].videoUrl,
            ))
        }

        dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    }
}

export const createProduct = (title, videoUrl = []) => { 
    return async dispatch => { 
        //any async code
        const response = await fetch('https://practice1-78cf4-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                videoUrl,
            })
        });

        const resData = await response.json();
        
        dispatch({
            type: CREATE_PRODUCT, 
            productData: {
                id: resData.name,
                title,
                videoUrl,
            }
        }); 
    };
};

export const updateProduct = (id, title, videoUrl) => {
    return async (dispatch, getState) => {
        //const token = getState().auth.token;
        //console.log(getState());
        const response = await fetch(
            `https://practice1-78cf4-default-rtdb.firebaseio.com/products/${id}.json`, 
            {
                method: 'PATCH',//patch will update
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    videoUrl
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch( { 
            type: UPDATE_PRODUCT, 
            pid: id,
            productData: {
                title,
                videoUrl
            } 
        });
    }
}; 