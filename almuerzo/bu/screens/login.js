import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useForm from '../hooks/useForm'
import { json } from 'body-parser';


export default ({ navigation }) => {

    const initialState = {
        emaill: '',
        passwordd: '',
    }

    const onSubmit = values => {

        console.log(values) //{emaill: "ss", passwordd: "s"}
        console.log(values.emaill) //ss
        console.log(JSON.stringify(values)) //{"emaill":"ss","passwordd":"s"}

        //JSON.parse() toma una cadena JSON y la transforma en un objeto de JavaScript.
        // JSON.stringify() toma un objeto de JavaScript y lo transforma en una cadena JSON.

        fetch('https://serverlesswmigue-wmigue.vercel.app/myAPI/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(values), //REQUEST
        })
            .then(x => x.text()) //[OBJECT JAVASCRIPT O RESPONSE] lo paso a JSON para mostrarlo en el alert.
            .then(x => {
                alert("RESPONSE DEL SERVIDOR: " + x) //RESPONSE: {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVjZGEzMGE2MjRiYzAwMDllNjhhMTAiLCJpYXQiOjE2MjYxOTMwODMsImV4cCI6MTY1NzcyOTA4M30.-XrGLwuOgXXq2zZmNSpBBIuG3TpS9GRcEaNu_s9Jpzc"}

                return JSON.parse(x) //lo paso a objeto javascript para usarlo mas abajo. {token : "eyJhbGciOiJIUzI1NiIsInR5c...."} porque asyncStorage lee objetos de ese tipo y no jsons. luego lo retorno al siguiente .then()
            })
            .then(x => {

                AsyncStorage.setItem('token', x.token) //para guardar el token en el telefono del usuario, para en el siguiente inicio de sesion enviarlo directamente a la pantalla de Meals y no pedir credenciales de nuevo.
                navigation.navigate('Meals')
            })


    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Iniciar Sesión: </Text>
            <TextInput
                values={inputs.emaill}
                onChangeText={subscribe('emaill')}
                style={styles.input}
                placeholder={'Ingresa un email'}
                autoCapitalize='none'>
            </TextInput>
            <TextInput
                values={inputs.passwordd}
                onChangeText={subscribe('passwordd')}
                style={styles.input}
                placeholder={'Ingresa un passss'}
                secureTextEntry={true}
                autoCapitalize='none'>
            </TextInput>
            <View style={styles.vistas}>
                <TouchableOpacity title="entrar" style={styles.botones} onPress={handleSubmit} />
                <TouchableOpacity title="registrarse" style={styles.botones} onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    )
}






const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 6,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        alignSelf: 'stretch',
        marginBottom: 10,
        padding: 5,
    },

    vistas: {
        flexDirection: 'row',
        margin: 12,
        paddingLeft: 65,
        justifyContent: 'center',
        alignItems: 'center',


    },
    botones: {

        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        width: 80,
        color: 'white',
        borderRadius: 2,
        marginHorizontal: 5,
        backgroundColor: 'coral',
        textAlign: 'center', textAlignVertical: 'center',
        borderRadius: 10,
        letterSpacing: 3,



    },
})