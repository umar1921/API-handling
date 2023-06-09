import { StyleSheet, Alert, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView, Keyboard, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Input from '../components/CustomInput'
import Title from '../components/CustomeTitle'
import CustomButton from '../components/CustomButton'
import CustomeSafeArea from '../components/CustomeSafeArea'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODdlYWMxOGRlNWRiZWJjYTI5YTAwOTZlODJmOGFlNjBkMzU5MGM1MmM1NWVmNmRmN2VkMTQ2ODBlYjllMzdmNmJjMjAyZDRjODliNWZhNTciLCJpYXQiOjE2ODYxNDMxODAuMzE0MzA2LCJuYmYiOjE2ODYxNDMxODAuMzE0MzEyLCJleHAiOjE3MTc3NjU1ODAuMzA5MjE5LCJzdWIiOiIxMTUiLCJzY29wZXMiOltdfQ.YApd-68JzGR0B0z3i3-N6yiFinDvaqkFUB2Ys5i_ZbS1AehEiti24IqnStbsiN_Bzoev99JB6qT3WYO9zBxrI3YM-qPKYtvtQTyEYuYK1O3wrykoiZse3et1n1FiSQdSfAzET_OIQAqWBV0fnma_08sLL_1yM8Iih2EPXFUHv-e3Rqt-BHuxEKLfJWtFrK5aR2crm9REPQRhCbqoAxqmCuRoWpOHcfYkGil6G-Z8cTyQnWkF9HrZuJ1veDKeYWDNbpiFaAkGD27MNy7Xi9UIYVBj4g7IbtU2k3l7j5MIHz6UnQrjHQQ9VLnk99yEblBrISefnyxa3RYZZM7rOfFQavTn55tfDJmRaSExxdNpe2MDWv5u-g3mefwLfX_OLlVnPBTB4urqiXSGWmveAwWq6_HD6ilCewGB-rlRHfGHCG9G3mRYquTmeMx0ZBtEbbr_UNgQkYkQqyekbvV4idVXz82TAtOpTg3A25oQVlA4KIfhUbkLOZFfpmHsfKFt2UvL7y9NZNcqANcMGrzYLOC43aQ3m1TEDeEBRBRJQn5lidQahSExOg8tOReuJC0KCYYikg11HZHEyqtlIpfZRpNjykIL6AXKmKTE9kt4HSDVnTf5fw198yo-sdmnoX3eIB3zu3BOJWjINS2Dy7ShBysr1Otbbt98uqCe7YJMQC2_stk'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('a@a.com')
    const [password, setPassword] = useState('123456')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    };

    const loginHandler = async () => {
        Keyboard.dismiss()
        setLoading(true)
        const user = {
            email: email,
            password: password,
        }

        let isValid = true

        //email validation
        if (email == '') {
            setEmailErr('The email field is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailErr('Please enter a valid email address.');
            isValid = false;
        }
        //passord validation
        if (password == '') {
            setPasswordErr('The password field is required.')
            isValid = false;
        } else if (password.length < 6) {
            setPasswordErr('Password should be at least 6 digits')
            isValid = false
        }

        if (isValid) {
            setLoading(true)
            try {
                const response = await fetch('https://apingweb.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(user),
                })
                const res = await response.json();
                console.log('Result: ', res)

                if (response.ok) {
                    Alert.alert(
                        'Success',
                        'Login successfully',
                        [
                            {
                                text: 'OK',
                                // onPress: () => navigation.navigate('Home'),
                                onPress: () => navigation.navigate('Home'),
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                        ]
                    );
                    setEmail('')
                    setPassword('')
                } else {
                    let userErr = res
                    console.log('responseArr: ', userErr.message)
                    Alert.alert('Error', userErr.message);
                    setPasswordErr('')
                }

            } catch (error) {
                setError(error.message)
            }
        }
        setLoading(false)
    }

    return (
        <CustomeSafeArea>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title title='Login' />
                    <Input
                        iconName='email-outline'
                        onChangeText={(email) => setEmail(email)}
                        placeholder='Email address'
                        value={email}
                        onFocus={() => setEmailErr('')}
                    // onPressIn={() => setEmailErr('')}
                    />
                    {emailErr !== '' && <Text style={{ color: 'red' }}>{emailErr}</Text>}
                    <Input
                        iconName='lock-outline'
                        onChangeText={(password) => setPassword(password)}
                        placeholder='Password'
                        value={password}
                        password
                        onFocus={() => setPasswordErr('')}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Forgot Password')} style={{ alignItems: 'flex-end', paddingTop: 5 }}>
                        <Text style={{ fontSize: 16 }} >Forgot password?</Text>
                    </TouchableOpacity>
                    {passwordErr !== '' && <Text style={{ color: 'red' }}>{passwordErr}</Text>}
                    <CustomButton title='Login' onPress={loginHandler} />
                    <>
                        {error && <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>}
                        {loading && <ActivityIndicator size="large" color={Color.primary} />}
                    </>
                </ScrollView>
            </KeyboardAvoidingView>
        </CustomeSafeArea>
    )
}

export default Login

const styles = StyleSheet.create({})