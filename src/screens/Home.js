import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomeSafeArea from '../components/CustomeSafeArea'
import CustomeTitle from '../components/CustomeTitle'
import CustomButton from '../components/CustomButton'

const Home = ({ navigation }) => {
    return (
        <CustomeSafeArea>
            <CustomeTitle title='Home' />
            <CustomButton title='Login' onPress={() => navigation.navigate('Login')} />
            <CustomButton title='Register' onPress={() => navigation.navigate('Register')} />
        </CustomeSafeArea>
    )
}

export default Home

const styles = StyleSheet.create({})