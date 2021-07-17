import React from 'react'
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiLista from '../components/MiLista'
import usarFetch from '../hooks/usarFetch'
import Cargando from '../components/Cargando';






const MisPedidos = ({ navigation }) => {


    //const { loading, data } = usarFetch('https://serverlesswmigue-wmigue.vercel.app/myAPI/orders/todos')
    const { loading, data } = usarFetch('http://localhost:3000/myAPI/orders/userOrders')


    const Rol = () => {
        alert(data.noHayRol)
        navigation.navigate('OnBoarding')
    }


    return (
        <View style={styles.container}>
            {loading ? <Cargando info={"mis pedidos "}></Cargando> :
                <FlatList
                    style={styles.list}
                    data={data.noHayRol ? Rol() : data}
                    keyExtractor={x => x._id}
                    renderItem={({ item }) =>
                        <MiLista
                            name={"comida: " + item.meal_id.name}
                            desc={"cliente: " + item.user_id.email}
                            mail={"orden nº: " + item._id}
                            onPress={() => { }}
                        />}
                />}


        </View>
    )
}

MisPedidos.navigationOptions = ({
    title: 'Mis pedidos',

})

export default MisPedidos











const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    list: {
        alignSelf: 'stretch',
    }
})