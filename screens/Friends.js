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
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import Constants from 'expo-constants';
import SelectUsersModal from './SelectUsersModal';
import SafeViewAndroid from '../utils/hooks/SafeViewAndroid';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#36393e',
    flex: 1,
    alignItems: 'flex-start',
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
  header: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
    width,
    backgroundColor: '#36393e',
    borderBottomWidth: 1,
    borderColor: '#17181e',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
  },
  bottomText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 50,
    marginLeft: 30,
  },
  topBar: {
    backgroundColor: '#36393e',
    width,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },

});

function FriendsPage({ route, u }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [friendRemoved, setFriendRemoved] = useState(false);
  const [friends, setFriends] = useState([{
    title: 'Online',
  },
  {
    title: 'Offline',
  },
  ]);
  useFocusEffect(
    React.useCallback(() => {
      axios.get(`${Constants.expoConfig.extra.apiUrl}/friends/${1}`)// configure apiURL in .env
        .then((response) => {
          console.log('useEffect', route);
          const offline = [];
          const online = [];
          for (let i = 0; i < response.data.length; i += 1) {
            if (response.data[i].online) {
              online.push({
                id: response.data[i].id,
                username: response.data[i].username,
              });
            } else {
              offline.push({
                id: response.data[i].id,
                username: response.data[i].username,
              });
            }
          }
          friends[1].data = offline;
          friends[0].data = online;
          setFriends([...friends]);
        })
        .catch((err) => {
          console.log('ERROR :', err.message);
        });
    }, [friendRemoved]),
  );
  // console.log('friends: ', friends);
  return !friends[0].data ? null : (
    <View style={styles.container}>
      <SafeAreaView style={{ ...SafeViewAndroid.AndroidSafeArea, flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.pageTitle}>Friends</Text>
        </View>
        <SelectUsersModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedUser={selectedUser}
          currentScreen="friendsList"
          friendRemoved={friendRemoved}
          setFriendRemoved={setFriendRemoved}
        />
        <SectionList
          sections={friends}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setModalVisible(!modalVisible);
                setSelectedUser(item);
              }}
            >
              <Text style={styles.title}>{item.username}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title, data } }) => (
            <Text style={styles.header}>
              { title }
              {' - '}
              { data.length }
            </Text>
          )}
          stickySectionHeadersEnabled
        />
      </SafeAreaView>
    </View>
  );
}

export default FriendsPage;
