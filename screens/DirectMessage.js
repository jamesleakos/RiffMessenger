import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SectionList, Button, StyleSheet, StatusBar, FlatList, TextInput, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import socket from '../utils/hooks/socket';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";
import moment from 'moment';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import axios from 'axios';

import { UserId } from '../navigation/userStack'

var {width, height} = Dimensions.get('window');

export default function DirectMessageScreen ({ friendId }) {
  // get the userID
  const userId = React.useContext(UserId);

  // the messages to be displayed
  const [messages, setMessages] = useState([]);
  // the current message that we are creating
  const [text, setText] = useState('');

  // get the messages from the server
  useEffect(() => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/directmessages/${userId}/${friendId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log('Error in chat screen ', error.message);
      });
  }, [friendId]);

  socket.on('new_message', (message) => {
    setMessages([...messages, message]);
  });

  const sendMessage = () => {
    if (text === '') return;
    const messageObj = {
      message: text,
      server_id: null,
      channel_id: null,
      user_id: userId,
      recipient_id: friendId,
    }
    socket.emit('message', messageObj);
    setText('');
  };

  const formatTimeAgo = (timestamp) => {
    const time = moment(parseInt(timestamp));
    const now = moment();
    if (time.isSame(now, 'day')) {
      return "Today " + time.format("h:mm A");
    } else if (time.isSame(now.subtract(1, 'days'), 'day')) {
      return "Yesterday " + time.format("h:mm A");
    } else {
      return time.format("MM/DD/YYYY h:mm A");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#36393e', }} behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <FlatList
        style={{marginHorizontal: 16}}
        inverted
        data={[...messages].reverse()}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image style={styles.profilePicture} source={{uri: 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg'}}></Image>
            <View style={styles.textContainer}>
              <View style={styles.topLine}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.timestamp}>{formatTimeAgo(item.created_at)}</Text>
              </View>
              <Text style={styles.messageLine}>{item.message}</Text>
            </View>
          </View>
        )}
        />
      <TextInput
        style={ styles.chatBar }
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor="#71757c"
        />
      <Button title="Send" onPress={sendMessage} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#36393e',
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    padding: 5,
  },
  header: {
    fontSize: 20,
    color: '#fff',
    padding: 5,
    backgroundColor: '#36393e',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  chatBar: {
    backgroundColor: '#292b2f',
    height: 40,
    width: width,
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#71757c',
  },
  messageLine: {
    color: '#d5d6d6',
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 10,
    padding: 10,
  },
  messageContainer: {
    padding: 5,
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  username: {
    color: '#fff',
  },
  topLine: {
    flexDirection: 'row',
  },
  timestamp: {
    color: '#71757c',
    paddingHorizontal: 20,
    fontSize: 12,
  },
  server: {
    width: width*.18,
    height: width*.18,
    borderRadius: width*.09,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: width*.01,
    backgroundColor: '#5865f2',
  },
  userItem: {
    padding: 10,
    justifyContent: 'center',
    fontSize: 14,
    height: 50,
    width,
    borderBottomWidth: 1,
    borderColor: '#17181e',
    color: '#fff',
  },
  topBar: {
    backgroundColor: '#36393e',
    width,
    height: 60,
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: width / 4,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  topBarText: {
    fontSize: 20,
    color: '#fff',
  }
});