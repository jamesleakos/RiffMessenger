// Account
  // username
  // Email
  // password
  // delete account
  // set status
  // Friend requests
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SectionList,
  Button,
  SafeAreaView,
} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";
import axios from 'axios';
import Constants from 'expo-constants';
import { UserId } from '../navigation/userStack'

const auth = getAuth();

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#36393e',
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#17181e',
    fontSize: 14,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#36393e',
    color: '#fff',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    color: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});

const MenuButton = (content, route) => (
  <TouchableOpacity onPress={() => signOut(auth)}>
    <Text style={styles.item}>{content}</Text>
  </TouchableOpacity>
);

function Account() {
  const userId = React.useContext(UserId);

  let userName = 'tempName';

  const handleSignOut = () => {
    signOut(auth);
    axios.put(`${Constants.manifest?.extra?.apiUrl}/users/${userId}`, {
      online: false
    })
  }

  const [pageData, setPageData] = useState([
    {
      title: userName,
      data: [
        { text: 'Change Username', action: () => console.log('clicked') },
        { text: 'Change Email', action: () => console.log('clicked') },
        { text: 'Change Password', action: () => console.log('clicked') },
        { text: 'Delete Account', action: () => console.log('clicked') },
        { text: 'View Friends Request', action: () => console.log('clicked') },
        { text: 'Sign Out', action: () => handleSignOut() }],
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 1 }}>
        <SectionList
          sections={pageData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={item.action}>
              <Text style={styles.title}>{item.text}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

export default Account;
