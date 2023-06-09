import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../config/Color'

const CustomeTitle = ({ title }) => {
    return (
        <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}

export default CustomeTitle

const styles = StyleSheet.create({
    title: {
        paddingTop: '20%',
        marginBottom: 20
    },
    titleText: {
        color: Color.primary,
        fontSize: 30,
        fontWeight: 'bold'
    }
})