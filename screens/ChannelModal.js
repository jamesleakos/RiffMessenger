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
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
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
    padding: 10,
    width,
    height: height / 2,
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
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonInteractive: {
    height: 100,
    margin: 10,
    backgroundColor: '#17181e',
    flex: 1,
  },
  buttonClose: {
    margin: 10,
    backgroundColor: '#17181e',
    width: width / 2,
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
    height: height / 2,
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
});

function ChannelModal({
  channelModal, setChannelModal, channelName, channel,
}) {
  const [newChannelName, setNewChannelName] = useState('');
  const handleDeleteServer = () => {
    if (channel !== 1) {
      axios.delete(`http://${Constants.manifest?.extra?.apiUrl}/channels/${channel}`)
        .then(() => {
          setChannelModal(!channelModal);
        })
        .catch((err) => {
          console.log('error deleting', err);
        });
    } else {
      console.log('Cannot delete general');
    }
  };

  const handleRenameServer = () => {
    if (channel !== 1) {
      axios.put(`http://${Constants.manifest?.extra?.apiUrl}/channels/${channel}`, {
        channel_name: newChannelName,
      })
        .then(() => {
          setChannelModal(!channelModal);
        })
        .catch((err) => {
          setChannelModal(!channelModal);
          console.log('error renaming', err);
        });
    } else {
      console.log('Cannot delete general');
    }
  };
  return !channelModal ? null : (
    <Modal
      animationType="slide"
      transparent
      visible={channelModal}
      onRequestClose={() => {
        setChannelModal(!channelModal);
      }}>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          setChannelModal(!channelModal);
        }}
      >
        <ScrollView
          directionalLockEnabled
          // centerContent={true}
          contentInset={{
            top: height / 2, left: 0, bottom: 0, right: 0,
          }}
          onScrollEndDrag={() => setChannelModal(!channelModal)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>
                {channelName}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonInteractive]}
                  onPress={() => handleRenameServer()}
                >
                  <Text style={styles.textStyle}>Change name</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonInteractive]}
                  onPress={() => handleDeleteServer()}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text>Enter new server name before hitting change name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNewChannelName(text)}
                  value={newChannelName}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
}

export default ChannelModal;
