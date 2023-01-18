// for logged - in users
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
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
  const [friends, setFriends] = useState([{
    title: 'Online',
  },
  {
    title: 'Offline',
  },
  ]);
  if (Constants.expoConfig.extra.apiUrl) {
    useEffect(() => {
      axios.get(`${Constants.expoConfig.extra.apiUrl}/friends/${27}`)// configure apiURL in .env
        .then((response) => {
          const offline = [];
          for (let i = 0; i < response.data.length; i += 1) {
            offline.push(response.data[i].username);
          }
          friends[1].data = offline;
          friends[0].data = [];
          setFriends([...friends]);
          // console.log(friends);
        })
        .catch((err) => {
          console.log('ERROR :', err.message);
        });
    }, []);
  }
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
        <Tab.Screen name="Main">
          {(props) => <MainPage { ...props } friends={friends} />}
        </Tab.Screen>
        <Tab.Screen name="Friends">
          {(props) => <FriendScreen { ...props } friends={friends} />}
        </Tab.Screen>
        <Tab.Screen name="Profile" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
