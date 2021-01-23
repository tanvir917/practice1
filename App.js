import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import NavigationContainer from './NavigationContainer';
import authReducer from './store/reducers/auth';
import productsReducer from './store/reducers/products';
import ReduxThunk from 'redux-thunk';

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
