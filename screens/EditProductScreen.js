import React, { useState, useEffect, 
    useCallback, useReducer } from 'react';
import { View, ScrollView, KeyboardAvoidingView, 
    StyleSheet, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../store/actions/products';
import Input from '../components/UI/Input';

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
    const prodId = props.navigation.getParam('productId');
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

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please check the errors in the form.', [
                { text: 'Okay' }
            ]);
            return;
        }
        //console.log('Submitting!');
        if (editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.videoUrl
                )
            );
        } else {
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.videoUrl, 
                )
            );
        }
        props.navigation.goBack();
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

    return (
        <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={100} >
            <ScrollView>
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
            </ScrollView>
        </KeyboardAvoidingView>
        
    )
};



const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    
});

export default EditProductScreen;