import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const CourseItem = props => {
    const isAdmin = props.isAdmin;
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product} >
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={isAdmin ? styles.container : styles.container1}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                        {props.isAdmin ? (
                            <Button 
                            title='Update Product' 
                            onPress={props.onUpdate}
                        ></Button>
                        ) : null}
                    </View>
                </TouchableCmp>
            </View>
        </View>
        
    )
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 200,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '82.2%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 30,
        marginVertical: 2,
    },
});

export default CourseItem;