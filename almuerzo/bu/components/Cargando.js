import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'



const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'blue',
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default ({ info }) => {

    return (


        <View style={styles.container}>

            <ActivityIndicator size="large" color="coral" /> {'\n'}
            <Text>
                cargando {info}
            </Text>

        </View>


    )
}







