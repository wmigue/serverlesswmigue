import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        height: 60,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    textos: {
        fontSize: 18,
    },
    textos2: {
        fontSize: 11,
    },
})

export default ({ name, desc, mail, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.textos}> {name} </Text>
            <Text style={styles.textos2}> {desc} </Text>
            <Text style={styles.textos2}> {mail} </Text>
        </TouchableOpacity>
    )
}