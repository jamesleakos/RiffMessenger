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
} from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection: 'column',
    backgroundColor: '#36393e',
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    backgroundColor: '#17181e',
    borderBottomWidth: 1,
    borderColor: '#36393e',
    color: '#fff',
  },
  header: {
    fontSize: 20,
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: 10,
    color: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});

// const MenuButton = (content, route) => (
//   <TouchableOpacity>
//     <Text>{content}</Text>
//   </TouchableOpacity>
// );

function Account() {
  let userName = 'tempName';
  const [pageData, setPageData] = useState([
    {
      title: userName,
      data: ['Change Username', 'Change Email', 'Change Password', 'Delete Account', 'View Friend Requests'],
    },
  ]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={pageData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <Button title="Sign Out" buttonStyle={styles.item} onPress={() => signOut(auth)}/>
    </View>
  );
}

export default Account;
