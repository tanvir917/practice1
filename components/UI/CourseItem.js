import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const CourseItem = props => {
    
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product} >
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onViewDetail} useForeground>
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                        <Button 
                            title='Update Product' 
                            onPress={props.onUpdate}
                        ></Button>
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
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 30,
        marginVertical: 2,
    },
});

export default CourseItem;