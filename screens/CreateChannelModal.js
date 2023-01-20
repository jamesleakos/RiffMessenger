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

function CreateChannelModal({createChannelModal, setCreateChannelModal, server, loadChannels}) {

  const [channelName, setChannelName] = useState('');

  const handleCreateChannel = () => {
    axios.post(`http://${Constants.manifest?.extra?.apiUrl}/channels`, {
      channel_name: channelName,
      server_id: server,
    })
      .then(() => {
        axios.get(`http://${Constants.manifest?.extra?.apiUrl}/channels/${server}`)
          .then(response => {
            //loadChannels();
            setCreateChannelModal(!createChannelModal);
            setChannelName('');
          })
          .catch(error => {
            console.log('Error getting users in server ', error.message);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return !createChannelModal ? null : (
    <Modal
      animationType="slide"
      transparent
      visible={createChannelModal}
      onRequestClose={() => {
        setCreateChannelModal(!createChannelModal);
      }}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          setCreateChannelModal(!createChannelModal);
        }}
      >
        <ScrollView
          directionalLockEnabled
          // centerContent={true}
          contentInset={{
            top: height / 2, left: 0, bottom: 0, right: 0,
          }}
          onScrollEndDrag={() => setCreateChannelModal(!createChannelModal)}
        >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Create A Channel</Text>
              <Text style={styles.subheader}>Create a new channel for everyone to talk in!</Text>
              <View style={styles.container}>
              <Text style={styles.label}>New Channel Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setChannelName(text)}
                value={channelName}
              />
              <Pressable style={styles.button} onPress={() => handleCreateChannel()}>
                <Text style={styles.buttonText}>Create</Text>
              </Pressable>
              </View>
            </View>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
}

export default CreateChannelModal;