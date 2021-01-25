import React, { useState, useEffect, 
    useCallback, useReducer } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, 
    StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../store/actions/products';
import Input from '../components/UI/Input';
import Colors from '../constants/Colors'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
}

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const isAdmin = props.navigation.getParam('isAdmin');
    const editedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === prodId)
    );

    console.log('=============editedProduct=======================');
    console.log(prodId);
    console.log(editedProduct);
    console.log('====================================');
    const dispatch = useDispatch();

   const [formState, dispatchFormState ] =  useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title: '',
            videoUrl: editedProduct ? editedProduct.videoUrl: '',
        }, 
        inputValidities: {
            title: editedProduct ? true: false,
            videoUrl: editedProduct ? true: false,
        }, 
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay'}]);
        }
    }, [error]);

    const submitHandler = useCallback(async() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        setError(null);
        setIsLoading(true);
        //console.log('Submitting!');
        try {
            if (editedProduct) {
                await dispatch(
                    productsActions.updateProduct(
                        prodId, 
                        formState.inputValues.title, 
                        formState.inputValues.videoUrl
                    )
                );
            } else {
                await dispatch(
                    productsActions.createProduct(
                        formState.inputValues.title, 
                        formState.inputValues.videoUrl, 
                    )
                );
            } 
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }
    
    setIsLoading(false);
}, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier//'title'
        });
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={100} >
            <ScrollView>
                {isAdmin ? (
                    <View>
                        <View style={styles.form}>
                            <Input 
                                id="title"
                                label="Title"
                                errorText="Please enter a valid title!"
                                keyboardType='default'
                                autoCapitalize='sentences'
                                autoCorrect
                                returnKeyType='next'
                                onInputChange={inputChangeHandler}
                                initialValue={editedProduct ? editedProduct.title: ''}
                                initiallyValid={!!editedProduct}
                                required
                            />
                            <Input 
                                id='videoUrl'
                                label="Video Url"
                                errorText="Please enter a valid Video url!"
                                keyboardType='default'
                                returnKeyType='next'
                                onInputChange={inputChangeHandler}
                                initialValue={editedProduct ? editedProduct.videoUrl: ''}
                                initiallyValid={!!editedProduct}
                                required
                            />
                        </View>
                        <Button title='Submit Course' onPress={submitHandler}></Button>
                    </View>
                ) : (
                    <Text style={{color: 'red', fontSize: 25, fontWeight:'bold'}}>Not Authenticated</Text>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
        
    )
};



const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;