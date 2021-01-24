import React, { useEffect, useCallback } from 'react';
import { Button, FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsAction from '../store/actions/products';
import CourseItem from '../components/UI/CourseItem';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    // console.log('============props========================');
    // console.log(props);
    // console.log('====================================');

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
            <Button 
                title='Add Product' 
                onPress={() => props.navigation.navigate('EditProductScreen')}
            ></Button>
            <FlatList 
                data={products} 
                keyExtractor={item => item.id} 
                renderItem={itemData => <CourseItem 
                    prodId={itemData.item.id}
                    title={itemData.item.title}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', { 
                            productId: itemData.item.id ,
                            productTitle: itemData.item.title
                        });
                    }}
                    onUpdate={() => {
                        props.navigation.navigate('EditProductScreen', {
                                productId: itemData.item.id
                        })
                    }}
                />} 
            />
            
        </View>
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Courses'
};

export default ProductsOverviewScreen;