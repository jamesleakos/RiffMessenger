// includes all stacks for unauthenticated users

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/Landing.js';
import SignInScreen from '../screens/SignIn.js';
import SignUpScreen from '../screens/SignUp.js';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={LandingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}