import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Movie from '../../screens/Movie/Index'
import Register from '../../screens/Register/Index'
import Login from '../../screens/Login/Index'

const Stack = createStackNavigator()

export default function Index(props) {
    return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}> 
        <Stack.Screen name="Movie" component={Movie} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  )
}