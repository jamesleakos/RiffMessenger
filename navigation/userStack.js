// for logged - in users
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/Home.js';
import MainPage from '../screens/MainPage.js'
import FriendsPage from '../screens/FriendsPage.js';

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
  const [drawerStatus, setDrawerStatus] = useState(true)
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      {drawerStatus
        ? <Tab.Navigator screenOptions={({ route }) => ({
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
            <Tab.Screen name="Main">{(props) => <MainPage {...props} setDrawerStatus={setDrawerStatus} />}</Tab.Screen>
            <Tab.Screen name="Friends" component={FriendsPage} />
            <Tab.Screen name="Profile" component={TempScreen} />
          </Tab.Navigator>
        : <Tab.Navigator screenOptions={({ route }) => ({
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
              tabBarStyle: { backgroundColor: '#36393e', display: 'none' }
            })}>
            <Tab.Screen name="Main">{(props) => <MainPage {...props} setDrawerStatus={setDrawerStatus} />}</Tab.Screen>
            <Tab.Screen name="Friends" component={FriendsPage} />
            <Tab.Screen name="Profile" component={TempScreen} />
          </Tab.Navigator>
      }

    </NavigationContainer>
  );
}