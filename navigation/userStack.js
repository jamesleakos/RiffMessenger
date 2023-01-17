// for logged - in users
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../screens/MainPage.js';
import FriendScreen from '../screens/Friends';
import AccountScreen from '../screens/Account';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Friends"
          component={FriendScreen}
          options={{
            title: 'Friends',
            headerStyle: {
              height: 80,
              backgroundColor: '#36393e',
            },
          }}
        />
        {/* <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: 'Account',
            headerStyle: {
              height: 80,
              backgroundColor: '#36393e',
            },
          }}
        /> */}
        {/* <Stack.Screen name="MainPage" component={MainPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
