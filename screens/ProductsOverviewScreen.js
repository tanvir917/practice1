import React, { useEffect, useCallback, useState } from 'react';
import { Button, FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsAction from '../store/actions/products';
import CourseItem from '../components/UI/CourseItem';
import database from '@react-native-firebase/database';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const userId = useSelector(state => state.auth.userId);
    const products = useSelector(state => state.products.availableProducts);
    const [admin, setAdmin] = useState([]);
    const dispatch = useDispatch();
    function checkValue(arr) {
        return arr === userId;
    }

    const loadProducts = useCallback(async () => {
        console.log('Load Products');
        setError(null);
        setIsRefreshing(true);
        //setIsLoading(true);
        try {
            await dispatch(productsAction.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
        //setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
        database()
            .ref('/admins')
            .once('value')
            .then(snapshot => {
                setAdmin(snapshot.val());
                //console.log('Admin data: ', snapshot.val());
            });
    }, [dispatch, loadProducts]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color='#c2185b' />
            </View>
        )
    }
  
    return (
        <View>
            {admin.some(checkValue) ? (
            <Button 
                title='Add Product' 
                onPress={() => props.navigation.navigate('EditProductScreen', {
                    isAdmin: admin.some(checkValue)
                })}
            ></Button>) 
        : null}
            {/* <Button 
                title='Create Admin' 
                onPress={() => props.navigation.navigate('dataCreate')}
            ></Button> */}
            <FlatList 
                onRefresh={loadProducts}
                refreshing={isRefreshing}
                data={products} 
                keyExtractor={item => item.id} 
                renderItem={itemData => <CourseItem 
                    prodId={itemData.item.id}
                    title={itemData.item.title}
                    isAdmin={admin.some(checkValue)}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', { 
                            productId: itemData.item.id ,
                            productTitle: itemData.item.title,
                            isAdmin: admin.some(checkValue)
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen;