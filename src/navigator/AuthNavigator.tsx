import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { FogotPassword, LoginScreen, OnboardingScreen, SignUpScreen, Verification } from '../screens';

const AuthNavigator = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen name='FogotPassword' component={FogotPassword} />
    </Stack.Navigator>
  )
}

export default AuthNavigator