import { StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'

import Input from '../components/CustomInput'
import Title from '../components/CustomeTitle'
import Color from '../config/Color'
import CustomeSafeArea from '../components/CustomeSafeArea'
import CustomButton from '../components/CustomButton'

const Register = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('dev1@yopmail.com')
    const [phone, setPhone] = useState('1234567890')
    const [password, setPassword] = useState('123456')
    const [passwordConfirm, setPasswordConfirm] = useState('123456')

    const [error, setError] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [phoneErr, setPhoneErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [passwordConfirmErr, setPasswordConfirmErr] = useState('')

    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    };

    const registerHandler = async () => {
        setLoading(true)

        const user = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: passwordConfirm
        }

        let isValid = true

        //name validation
        if (name == '') {
            setNameErr('The name field is required.');
            isValid = false;
        }

        //email validation
        if (email == '') {
            setEmailErr('The email field is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailErr('Please enter a valid email address.');
            isValid = false;
        }

        //phone validation
        if (phone == '') {
            setPhoneErr('The phone field is required.');
            isValid = false;
        } else if (phone.length < 10) {
            setPhoneErr('Number must be of 10 digits')
            isValid = false
        }

        //passord validation
        if (password == '') {
            setPasswordErr('The password field is required.')
        } else if (password.length < 6) {
            setPasswordErr('Password should be at least 6 digits')
            isValid = false
        }

        //passord confirm validation
        if (passwordConfirm == '') {
            setPasswordConfirmErr('The password confirm field is required.')
            isValid = false
        } else if (passwordConfirm != password) {
            setPasswordConfirmErr('The password confirmation does not match.')
            isValid = false
        }


        if (isValid) {
            setLoading(true)
            try {
                // const response = await fetch(`${BaseURL}/register/`, {
                const response = await fetch('https://apingweb.com/api/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
                const res = await response.json();

                //on success
                const userData = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    password_confirmation: passwordConfirm
                }

                if (response.ok) {
                    Alert.alert(
                        'Success',
                        'User registered successfully',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.navigate('Login'),
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                        ]
                    );
                    setName('')
                    setEmail('')
                    setPhone('')
                    setPassword('')
                    setPasswordConfirm('')
                } else {
                    // try {
                    let responseArr = res.errors
                    Alert.alert('Warning: ', responseArr[0]);
                    setError('')
                    // } catch (newError) {
                    // setError(newError);
                    // }
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
                    <Title title='Register' />
                    <Input
                        iconName='account-outline'
                        onChangeText={(name) => setName(name)}
                        placeholder='Enter your name'
                        value={name}
                        onFocus={() => setNameErr('')}
                    />
                    {nameErr !== '' && <Text style={{ color: 'red' }}>{nameErr}</Text>}
                    <Input
                        iconName='email-outline'
                        onChangeText={(email) => setEmail(email)}
                        placeholder='Email address'
                        value={email}
                        onFocus={() => setEmailErr('')}
                    />
                    {emailErr !== '' && <Text style={{ color: 'red' }}>{emailErr}</Text>}
                    <Input
                        iconName='phone'
                        onChangeText={(phone) => setPhone(phone)}
                        placeholder='Phone number'
                        value={phone}
                        onFocus={() => setPhoneErr('')}
                    />
                    {phoneErr !== '' && <Text style={{ color: 'red' }}>{phoneErr}</Text>}
                    <Input
                        iconName='lock-outline'
                        onChangeText={(password) => setPassword(password)}
                        placeholder='Password'
                        value={password}
                        password
                        onFocus={() => setPasswordErr('')}
                    />
                    {passwordErr !== '' && <Text style={{ color: 'red' }}>{passwordErr}</Text>}
                    <Input
                        iconName='lock-outline'
                        onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                        placeholder='Password confirm'
                        value={passwordConfirm}
                        password
                        onFocus={() => setPasswordConfirmErr('')}
                    />
                    {passwordConfirmErr !== '' && <Text style={{ color: 'red' }}>{passwordConfirmErr}</Text>}

                    <CustomButton title='Register' onPress={registerHandler} />
                    <>
                        {error !== '' && <Text style={{ color: 'red', alignSelf: 'center', fontSize: 16 }}>{error}</Text>}
                        {loading && <ActivityIndicator size="large" color={Color.primary} />}
                    </>
                </ScrollView>
            </KeyboardAvoidingView>
        </CustomeSafeArea>
    )
}

export default Register

const styles = StyleSheet.create({

})