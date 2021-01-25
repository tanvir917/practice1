import React from 'react'
import {useSelector} from 'react-redux'
import { View, Text, Button } from 'react-native'
import database from '@react-native-firebase/database'

const dataCreate = (props) => {
    const userId = useSelector(state => state.auth.userId);
    //const reference = database().ref('/admins')

    let dataToSave = 
        ["VaJO1KpTLsc7xvR17AHTdPVFRMS2", "DXszuC9n81PnpDYpg0RjVMNiSEV2"]
        
    const submitHandler = () => {
        database().ref('/admins').set(dataToSave)
        .then(() => console.log('Data created'));
    }
    return (
        <View>
            <Button 
                title="Create Admin"
                onPress={submitHandler}
            ></Button>
        </View>
    )
}
export default dataCreate;
