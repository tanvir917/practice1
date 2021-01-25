import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux'
import AuthScreen from './screens/AuthScreen'
import ProductsOverviewScreen from './screens/ProductsOverviewScreen'
import ProductDetailScreen from './screens/ProductDetail';
import Colors from './constants/Colors'
import EditProductScreen from './screens/EditProductScreen';
import dataCreate from './screens/dataCreate';
import * as authActions from './store/actions/auth'

const ProductsNavigator = createStackNavigator(
{
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
}, );

const AdminNavigator = createStackNavigator({
    EditProductScreen: EditProductScreen,
    //dataCreate: dataCreate
},);

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: '#c2185b'
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex: 1, marginTop: 40, margin: 10}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}} >
                    <DrawerItems {...props} />
                    <Button 
                        title="Logout" 
                        color={Colors.primary} 
                        onPress={() => {
                            dispatch(authActions.logout());
                            props.navigation.navigate('Auth');
                        }} 
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}); 

const MainNavigator = createSwitchNavigator({
    Auth:AuthNavigator ,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);