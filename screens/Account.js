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
import { UserId } from '../utils/hooks/context'

const auth = getAuth();

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#5865f2',
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
    justifyContent: 'center',
    fontSize: 14,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#17181e',
    color: '#fff',
  },
  page: {
    backgroundColor: '#36393e',
    height,
  },
  header: {
    color: '#fff',
    fontSize: 36,
    paddingLeft: 30,
    padding: 10,
    width,
    backgroundColor: '#5865f2',
    borderBottomWidth: .5,
    borderColor: '#fff',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});



function Account({ userName }) {
  const userId = React.useContext(UserId)

  const handleSignOut = () => {
    axios.put(`http://${Constants.manifest?.extra?.apiUrl}/users/${userId}`, {
      online: false
    })
    signOut(auth);
  }

  const [pageData, setPageData] = useState([
    {
      title: userName,
      data: [
        { text: 'Change Username', action: () => console.log('clicked') },
        // { text: 'Change Email', action: () => console.log('clicked') },
        { text: 'Change Password', action: () => console.log('clicked') },
        // { text: 'Delete Account', action: () => console.log('clicked') },
        // { text: 'View Friend Requests', action: () => console.log('clicked') },
        { text: 'Sign Out', action: () => handleSignOut() }],
    },
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 1,  }}>
        <View style={styles.page}>
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
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Account;
