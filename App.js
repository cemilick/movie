import { View, Text } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import MainRoutes from './src/routers/MainRoutes/Index'

export default function App() {
  return (
      <NavigationContainer>
        <MainRoutes />
      </NavigationContainer>
  )
}