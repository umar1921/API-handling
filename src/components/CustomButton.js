import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../config/Color'

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: Color.primary,
        borderRadius: 5,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Color.white,
        fontSize: 16,
    }
})