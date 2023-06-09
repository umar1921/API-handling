import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import Color from '../config/Color'

const CustomeSafeArea = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

export default CustomeSafeArea

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.white,
        paddingHorizontal: 20,
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})