import React from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
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
    height: height / 2,
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
});

const addFriend = (friend_id) => {
  axios.post(`${Constants.expoConfig.extra.apiUrl}/friends`, {
    user_id: 1,
    friend_id,
  })
    .then(() => {
      console.log('succesfully added friend');
    })
    .catch((err) => {
      console.log('Error adding friend', err);
    });
};

function SelectUsersModal({
  modalVisible, setModalVisible, selectedUser, currentScreen,
}) {
  console.log('selectedUser', selectedUser);
  return !modalVisible ? null : (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView
          directionalLockEnabled
          // centerContent={true}
          contentInset={{
            top: height / 2, left: 0, bottom: 0, right: 0,
          }}
          onScrollEndDrag={() => setModalVisible(!modalVisible)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>
                {selectedUser.username}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonInteractive]}
                  onPress={() => console.log('clicked')}
                >
                  <Text style={styles.textStyle}>Send Message</Text>
                </TouchableOpacity>
                {currentScreen === 'friendsList'
                  ? (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonInteractive]}
                      onPress={() => {
                        setModalVisible(!modalVisible)
                      }}
                    >
                      <Text style={styles.textStyle}>Remove Friend</Text>
                    </TouchableOpacity>
                  )
                  : (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonInteractive]}
                      onPress={() => addFriend(selectedUser.id)}
                    >
                      <Text style={styles.textStyle}>Add Friend</Text>
                    </TouchableOpacity>
                  )}

              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
}

export default SelectUsersModal;
