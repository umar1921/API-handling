import { StyleSheet, Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView, Keyboard, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Input from '../components/CustomInput'
import Title from '../components/CustomeTitle'
import CustomButton from '../components/CustomButton'
import CustomeSafeArea from '../components/CustomeSafeArea'
import Color from '../config/Color'


const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('dev1@yopmail.com')
    const [emailErr, setEmailErr] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const sendForgotPasswordEmail = async () => {
        setLoading(true)
        const data = {
            email: 'dev1@yopmail.com',
            title: 'Project Name',
            link: 'https://example.com/',
        };

        let isValid = true
        if (isValid) {

            try {
                const response = await fetch('https://apingweb.com/api/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                const res = await response.json();
                const msgSuccess = res.message
                console.log('Result forgot password: ', msgSuccess)
                if (response.status == 200) {
                    Alert.alert(
                        'Success',
                        `${msgSuccess}`,
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.navigate('Reset'),
                            },

                        ]
                    );
                }

            } catch (error) {
                setError(error.message)
            }
        }
        setLoading(false)
    };

    return (
        <CustomeSafeArea>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title title='Forgot Password' />
                    <Input
                        iconName='email-outline'
                        onChangeText={(email) => setEmail(email)}
                        placeholder='Email address'
                        value={email}
                        onFocus={() => setEmailErr('')}
                    />
                    {emailErr !== '' && <Text style={{ color: 'red' }}>{emailErr}</Text>}
                    <CustomButton title='Send' onPress={sendForgotPasswordEmail} />
                    {loading && <ActivityIndicator size='large' color={Color.primary} />}
                    <>
                        {error && <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>}
                        {/* {loading && <ActivityIndicator size="large" color={Color.primary} />} */}
                    </>
                </ScrollView>
            </KeyboardAvoidingView>
        </CustomeSafeArea>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({})