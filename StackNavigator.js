import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from './screens/HomeScreens';
import PickUp from './screens/PickUp';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import Maps from './screens/Maps';

const StackNavigator = () => {
    
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginIn" component={LoginScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreens}  options={{headerShown:false}}/>
        <Stack.Screen name="PickUp" component={PickUp} options={{headerShown:false}}/>
        <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Order" component={OrderScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Map" component={Maps}  options={{headerShown:false}}/>




      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;