import React from 'react'
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cargando from '../components/Cargando'
import usarFetch from '../hooks/usarFetch'



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







const Me = ({ navigation }) => {


    const { loading, data } = usarFetch('http://localhost:3000/myAPI/auth/me')



    return (

        <View style={styles.container}>

            {loading ?


                <Cargando
                    info={"Datos de cliente"}>
                </Cargando>


                :
                
                <View>
                    <Image
                        source={require('../static/img/avatar.jpg')}
                        style={{ height: 150, width: 150 }}>
                    </Image>
                    <Text>
                        ID: {data._id} {'\n'}
                        EMAIL: {data.email}
                    </Text>

                </View>
            }


        </View >

    )
}

Me.navigationOptions = ({
    title: 'yo',

})

export default Me






