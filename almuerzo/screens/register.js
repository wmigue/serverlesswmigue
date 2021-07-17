import React from 'react'
import { Alert, Text, TextInput, View, StyleSheet, Button } from 'react-native'
import useForm from '../hooks/useForm'

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
    }
})

export default ({ navigation }) => {
    const initialState = {
        email: '',
        password: '',
    }
    const onSubmit = (values) => {
        console.log(values)
        fetch('https://serverlesswmigue-wmigue.vercel.app/myAPI/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(values),
        })
            .then(x => x.text())
            .then(x => {
                if (x === 'usuario creado con èxito.') {
/*                return Alert.alert(
                        'EXITO!',
                        x,
                        [
                            { text: 'Ir al inicio', onPress: () => navigation.navigate('Login') }
                        ]
                    ) */
                    alert("exito.")
                }
/*                 Alert.alert(
                    'ERROR:',
                    x,
                ) */
                    alert("ya existe ese user.")
            })
    }

    const { subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit)
    console.log(inputs)


    return (
        <View style={styles.container}>
            <Text style={styles.title}> Registrarse:  </Text>
            <TextInput
                values={inputs.email}
                onChangeText={subscribe('email')}
                style={styles.input}
                placeholder={'Ingresa un email'}
                autoCapitalize='none'>
            </TextInput>
            <TextInput
                values={inputs.password}
                onChangeText={subscribe('password')}
                style={styles.input}
                placeholder={'Ingresa un password'}
                secureTextEntry={true}
                autoCapitalize='none'>
            </TextInput>
            <Button title="REGISTRARSE!" onPress={handleSubmit}></Button>
           

        </View>
    )
}