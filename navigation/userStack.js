// for logged - in usersimport React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../screens/MainPage.js';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainPage} options={{title: 'Register', headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}