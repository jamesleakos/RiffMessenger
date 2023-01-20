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
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  modalOverlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    display: 'flex',
    backgroundColor: '#36393e',
    borderRadiusTop: 20,
    height: height * .81,
    padding: 10,
    width,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
  },
  modalTitle: {
    fontSize: 28,
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
  },
  scrollModal: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    height: height,
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: width * .8,
    marginBottom: 20,
    backgroundColor: '#202225',
    color: '#fff'
  },
  button: {
    width: width * .8,
    height: 35,
    backgroundColor: '#5865f2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 260,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ececec',
  },
  subheader: {
    color: '#71757c'
  },
  buttonText: {
    color: '#fff'
  }

});

function InviteUserModal({inviteModal, setInviteModal, server, setUserList, isFriendInvite, friendRemoved}) {

  const [username, setUsername] = useState('');

  const handleAddFriendByUsername = () => {
    console.log('userId:', server);
    axios.post(`http://${Constants.expoConfig.extra.apiUrl}/friends/username`, { server, username })// server = userId
      .then(() => {
        setUserList(!friendRemoved);
        console.log('succesfully added friend');
      })
      .catch((err) => {
        console.log('Error adding friend', err);
      });

    // console.log('add friend', username, 'with userId ', server);
  };

  const handleInviteUser = () => {
    axios.post(`http://${Constants.manifest?.extra?.apiUrl}/servers/${server}`, {
      username: username
    })
      .then(() => {
        axios.get(`http://${Constants.manifest?.extra?.apiUrl}/server/${server}/users`)
          .then(response => {
            setUserList(response.data);
            setInviteModal(!inviteModal);
            setUsername('');
          })
          .catch(error => {
            console.log('Error getting users in server ', error.message);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return !inviteModal ? null : (
    <Modal
      animationType="slide"
      transparent
      visible={inviteModal}
      onRequestClose={() => {
        setInviteModal(!inviteModal);
      }}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          setInviteModal(!inviteModal);
        }}
      >
        <ScrollView
          directionalLockEnabled
          // centerContent={true}
          contentInset={{
            top: height / 2, left: 0, bottom: 0, right: 0,
          }}
          onScrollEndDrag={() => setInviteModal(!inviteModal)}
        >
            <View style={styles.modalView}>
              { isFriendInvite
                ? (
                  <View>
                    <Text style={styles.modalTitle}>Add a Friend</Text>
                    <Text style={styles.subheader}>Send a friend an invite!</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.modalTitle}>Invite A User</Text>
                    <Text style={styles.subheader}>Invite a friend to hang out!</Text>
                  </View>
                )}
              <View style={styles.container}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setUsername(text)}
                value={username}
              />

                { isFriendInvite
                  ? (
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        handleAddFriendByUsername();
                        setInviteModal(!inviteModal);
                      }}
                    >
                      <Text style={styles.buttonText}>Add Friend</Text>
                    </Pressable>
                  ) : (
                    <Pressable style={styles.button} onPress={() => handleInviteUser()}>
                      <Text style={styles.buttonText}>Invite</Text>
                    </Pressable>
                  )}
              </View>
            </View>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
}

export default InviteUserModal;