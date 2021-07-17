import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
//import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Cargando from '../components/Cargando'

export default ({ navigation }) => {


    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(x => {
                navigation.navigate(x ? 'Root' : 'OnBoarding') //hace un switch, dependiendo si hay token. ver app.js
            })
    }, [])


    return (
        <Cargando info={"Cargando... aguarde"}></Cargando>
    )
}