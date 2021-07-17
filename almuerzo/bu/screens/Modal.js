import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import usarFetch from '../hooks/usarFetch'
import Cargando from '../components/Cargando';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 1000,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 100,
    },

})

export default ({ navigation }) => {

    const id = navigation.getParam('_id') //parametro que le envio desde screen de meals.
    const { loading, data } = usarFetch(`http://localhost:3000/myAPI/meals/${id}`)
    console.log(data)
    return (
        loading ? <Cargando info={"datos de comida"}></Cargando> :
            < View style={styles.container} >
                <Text>{data._id}</Text>
                <Text>{data.name}</Text>
                <Text>{data.desc}</Text>
                <Button title="Encargar comida  " onPress={() => {
                    AsyncStorage.getItem('token')
                        .then(x => {
                            if (x) {
                                fetch('http://localhost:3000/myAPI/orders', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'Application/json',
                                        authorization: x, //token
                                    },
                                    body: JSON.stringify({
                                        meal_id: id,
                                    })
                                })
                                    .then(x => {
                                        console.log(x.status)
                                        if (x.status !== 201) {
                                            return alert('la orden no pudo ser generada.')
                                        }
                                        alert('orden generada con éxito')
                                        navigation.navigate('Meals')
                                    })

                            }
                        })

                }}>

                </Button>
            </View>
    )
}