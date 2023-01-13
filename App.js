import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import FriendsList from './Friends';
import menuIcon from './assets/menu.png';

export default function App() {

  const [isFriendsListVisible, setIsFriendsListVisible] = useState(false);

    const navigateToFriendsList = () => {
        setIsFriendsListVisible(!isFriendsListVisible);
    }

  return (
    <View style={styles.container}>
      <View style={styles.menuIconContainer}>
          <TouchableOpacity onPress={navigateToFriendsList}>
              <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
      </View>
      {isFriendsListVisible && <FriendsList />}
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
});
