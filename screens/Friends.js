// eslint-disable-next-line import/no-unresolved
import React, { useState } from 'react';
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
import SelectUsersModal from './SelectUsersModal';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";

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
    margin: 10,
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

function FriendsPage({ friends }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  // const [friends, setFriends] = useState(
  //   [{
  //     title: 'Online',
  //     data: ['friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5'],
  //   },
  //   {
  //     title: 'Offline',
  //     data: ['friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1'],
  //   }],
  // );
  // todo add online/offline count to backend
  return (
    <View style={styles.container}>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.pageTitle}>Friends</Text>
        </View>
        <SelectUsersModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedUser={selectedUser}
          currentScreen="friendsList"
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
              <Text style={styles.title}>{item}</Text>
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
