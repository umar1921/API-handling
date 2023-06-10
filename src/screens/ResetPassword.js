import { StyleSheet, Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView, Keyboard, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../components/CustomInput'
import Title from '../components/CustomeTitle'
import CustomButton from '../components/CustomButton'
import CustomeSafeArea from '../components/CustomeSafeArea'
import Color from '../config/Color'


const ResetPassword = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const getUserToken = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken')
            if (userToken !== null) {
                console.log('userToken reset password: ', userToken)
            } else {
                console.log('Token not found in AsyncStorage')
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    handleChangePassword = () => {
        getUserToken()
    }

    return (
        <CustomeSafeArea>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title title='Reset Password' />
                    <Input
                        iconName='lock-outline'
                        onChangeText={(newPassword) => setNewPassword(newPassword)}
                        placeholder='Enter new password'
                        value={newPassword}
                    // onFocus={() => setEmailErr('')}
                    />
                    {/* {emailErr !== '' && <Text style={{ color: 'red' }}>{emailErr}</Text>} */}
                    <CustomButton title='Change Password' onPress={handleChangePassword} />
                    {loading && <ActivityIndicator size='large' color={Color.primary} />}
                    <>
                        {/* {error && <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>} */}
                    </>
                </ScrollView>
            </KeyboardAvoidingView>
        </CustomeSafeArea>
    )
}

export default ResetPassword