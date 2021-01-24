import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import NavigationContainer from './NavigationContainer';
import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products';
import ReduxThunk from 'redux-thunk';
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2BKaZIn-kP2MW5eB_8S9mtFNH4u4mSmY",
  authDomain: "practice1-78cf4.firebaseapp.com",
  databaseURL: "https://practice1-78cf4-default-rtdb.firebaseio.com",
  projectId: "practice1-78cf4",
  storageBucket: "practice1-78cf4.appspot.com",
  messagingSenderId: "57461997599",
  appId: "1:57461997599:web:04bdc5c153d1e4df69152a",
  measurementId: "G-KX534XET4S"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, Auth }

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
