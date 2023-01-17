// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  SectionList,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection: 'column',
    backgroundColor: '#36393e',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  userText: {
    color: '#fff',
    margin: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    width,
    backgroundColor: '#36393e',
    // position: 'sticky',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    // position: 'sticky',
  },
  section: {
    margin: 10,
    width,
  },
  bottomText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 50,
    marginLeft: 30,
  },
  topBar: {
    backgroundColor: '#17181e',
    width,
    // position: 'sticky',
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    backgroundColor: '#17181e',
    width,
    position: 'absolute',
    bottom: 0,
    height: 90,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});

function FriendsPage({ navigation }) {
  const [testFriends, setTestFriends] = useState([{
    title: 'Online',
    data: [],
  },
  {
    title: 'Offline',
    data: [],
  },
  ]);
  if (Constants.expoConfig.extra.apiUrl) {
    useEffect(() => {
      axios.get(`${Constants.expoConfig.extra.apiUrl}/friends/${1}`)// look in app.config.js to configure this variable
        .then((response) => {
          const online = [];
          for (let i = 0; i < response.data.length; i += 1) {
            online.push(response.data[i].username);
          }
          testFriends[0].data = online;
          // setTestFriends({ ...testFriends });
          // console.log(testFriends);
        })
        .catch((err) => {
          console.log('ERROR :', err.message);
        });
    }, []);
  }
  // console.log('friends from api: ', testFriends);
  const [friends, setFriends] = useState(
    [{
      title: 'Online',
      data: ['friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5'],
    },
    {
      title: 'Offline',
      data: ['friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1'],
    }],
  );
  // todo add online/offline count to backend
  return !testFriends[0].data.length > 1 ? null : (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Friends</Text>
      </View>
      <SectionList
        style={styles.section}
        sections={testFriends}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Text style={styles.userText}>{item}</Text>
        )}
        renderSectionHeader={({ section: { title, data } }) => (
          <Text style={styles.sectionTitle}>
            { title }
            {' - '}
            { data.length }
          </Text>
        )}
        stickySectionHeadersEnabled
      />
    </View>
  );
}

export default FriendsPage;
