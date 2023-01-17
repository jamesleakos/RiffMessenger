// for logged - in users
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/Home.js';
import MainPage from '../screens/MainPage.js'
import FriendScreen from '../screens/Friends';
import AccountScreen from '../screens/Account';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TempScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PROFILE!</Text>
    </View>
  );
}

export default function UserStack() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Friends') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: '#36393e' }
        })}>
        <Tab.Screen name="Main" component={MainPage} />
        <Tab.Screen name="Friends" component={FriendScreen} />
        <Tab.Screen name="Profile" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Paying for college, if I leave within the first 2 years I have to pay it back
// 5,000 shraes of stock options
// 50000 for the first 3 months then 55000
// 10% bonus later in time
