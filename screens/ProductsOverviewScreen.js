import React, { useEffect, useCallback } from 'react';
import { Button, FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsAction from '../store/actions/products';
import CourseItem from '../components/UI/CourseItem';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    console.log('============products========================');
    console.log(products);
    console.log('====================================');

    useEffect(() => {
        dispatch(productsAction.fetchProducts());
    }, [dispatch]);

//    function productHandler(){ 
//         products.map(item => {
//             dispatch(
//                 productsActions.createProduct(
//                     item.title, 
//                     item.videoUrl
//                 )
//             );
//         })
//    }
//    productHandler();
   
    
    return (
        <View>
            <FlatList 
                data={products} 
                keyExtractor={item => item.id} 
                renderItem={itemData => <CourseItem 
                    title={itemData.item.title}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', { 
                            productId: itemData.item.id ,
                            productTitle: itemData.item.title
                        });
                    }}
                />} 
            />
            
        </View>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsOverviewScreen;