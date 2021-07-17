import React from 'react'
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import MiLista from '../components/MiLista'
import Cargando from '../components/Cargando'
import usarFetch from '../hooks/usarFetch'



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    botones: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        width:80,
        color: 'white',
        borderRadius: 2,
        marginHorizontal: 5,
        backgroundColor: 'coral',
        textAlign:'center', textAlignVertical: 'center',
        borderRadius:10,
        letterSpacing:3,
      
        

    },
    vistas: {
        flexDirection: 'row',
        margin: 12,
        paddingLeft: 65,
        justifyContent: 'center',
        alignItems: 'center',
        

    }
})



const Meals = ({ navigation }) => {

    // const { loading, data } = usarFetch('https://serverlesswmigue-wmigue.vercel.app/myAPI/meals')
    const { loading, data } = usarFetch('http://localhost:3000/myAPI/meals')

    return (


        <View style={styles.container}>

            {loading ?

                <Cargando info={"menú..."}></Cargando>

                :

                <FlatList

                    style={styles.list}
                    data={data}
                    keyExtractor={x => x._id}
                    renderItem={({ item }) =>
                        <MiLista
                            onPress={() => navigation.navigate('Modal', { _id: item._id })}
                            name={item.name}
                            desc={item.desc}
                        />}


                />}


            <View style={styles.vistas}>
                <TouchableOpacity style={styles.botones} title={"Mis Pedidos"}
                    onPress={() => navigation.navigate('MisPedidos')}>
                    <Text style={styles.botones}>Mis Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botones} title={"Mis Datos"}
                    onPress={() => navigation.navigate('Me')}>
                    <Text style={styles.botones}>Mis Datos</Text>
                </TouchableOpacity>
            </View>


        </View>



    )
}

Meals.navigationOptions = ({
    title: 'comidas disponibles',

})

export default Meals











/* const data = [
    { _id: 'lala', name: 'Churrascos', desc: 'Plato tipico, palta, mayonesa.' },
] */

