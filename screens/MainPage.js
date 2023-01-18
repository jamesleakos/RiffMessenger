import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SectionList, Button, StyleSheet, StatusBar, FlatList, TextInput, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import socket from '../utils/hooks/socket';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";
import moment from 'moment';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import axios from 'axios';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

var width = Dimensions.get('window').width;

const DATA = [
  {
    title: 'Online',
    data: ['User One', 'User Two', 'User Three'],
  },
  {
    title: 'Offline',
    data: ['User Four', 'User Five', 'User Six'],
  },
];

const ChatScreen = () => {

  const { user } = useAuthentication();
  console.log(user.uid);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [server, setServer] = useState(3);
  const [channel, setChannel] = useState(7);
  useEffect(() => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/messages/3/7`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log('Error in chat screen ', error.message);
      });
  }, []);

  socket.on('new_message', (message) => {
    setMessages([...messages, message]);
  });

  const sendMessage = () => {
    if (text === '') return;
    const messageObj = {
      message: text,
      server_id: server,
      channel_id: channel,
      user_id: 1,
      recipient_id: 0,
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
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#36393e', }} behavior="padding">
       <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <FlatList
          style={{marginLeft: 16}}
          inverted
          data={[...messages].reverse()}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Image style={styles.profilePicture} source={{uri: 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg'}}></Image>
              <View style={styles.textContainer}>
                <View style={styles.topLine}>
                  <Text style={styles.username}>{item.user_id}</Text>
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
};


const RightDrawerContent = () => {
  return (
    <View style={styles.container}>
      <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
    </View>
  );
}

const LeftDrawerScreen = () => {
  return (
    <LeftDrawer.Navigator
      id="LeftDrawer"
      defaultStatus="open"
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'back',
        swipeEnabled: true,
        swipeEdgeWidth: width/2,
        headerShown: false,
        drawerStyle: {
          width: '85%',
          backgroundColor: '#36393e',
        }
      }}>
      <LeftDrawer.Screen name="Channel" component={ChatScreen} />
    </LeftDrawer.Navigator>
  );
}

const RightDrawerScreen = () => {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={(props) => <RightDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerType: 'back',
        swipeEnabled: true,
        swipeEdgeWidth: width/2,
        drawerStyle: {
          width: '85%',
          backgroundColor: '#36393e',
        }
      }}>
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
}

const MainPage = ({ navigation, friends }) => {
  // console.log('friends in main page', friends);
  return (
    <RightDrawerScreen />
  );
};

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
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  chatBar: {
    backgroundColor: '#292b2f',
    height: 60,
    width: width,
    borderRadius: 30,
    paddingHorizontal: 20,
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
  }
});

export default MainPage;