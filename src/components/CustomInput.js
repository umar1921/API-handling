import { StyleSheet, View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Color from '../config/Color'
const CustomInput = ({
    value,
    iconName,
    onChangeText,
    onChange,
    password,
    placeholder,
    onFocus = () => { },
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, sethidePassword] = useState(password);

    return (
        <>
            <View style={[styles.container, {
                borderColor: isFocused ? Color.primary : Color.primaryLight
            }]}>
                <Icon name={iconName} style={{ fontSize: 20, color: Color.medium }} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    onChange={onChange}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={Color.medium}
                    secureTextEntry={hidePassword}
                    autoCapitalize='none'
                />
                {password && <Icon
                    name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => { sethidePassword(!hidePassword) }}
                    style={{ fontSize: 20, color: Color.medium }} />}
            </View>
            {/* {error && <Text style={styles.error}>{error}</Text>} */}
        </>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.white,
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: Color.light,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: Color.medium
    },
    error: {
        color: Color.danger
    }
})