import { StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/screens/Home'
import Register from './src/screens/Register'
import Login from './src/screens/Login'
import Color from './src/config/Color'
import ForgotPassword from './src/screens/ForgotPassword'
import Map from './src/screens/Map'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor={Color.primary} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Forgot Password' component={ForgotPassword} />
        <Stack.Screen name='Map' component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})