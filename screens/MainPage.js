import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SectionList, Button, StyleSheet, StatusBar, FlatList, TextInput, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import socket from '../utils/hooks/socket';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";
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
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [server, setServer] = useState(3);
  const [channel, setChannel] = useState(7);

  useEffect(() => {
    axios.get(`http://${Constants.manifest?.extra?.apiUrl}:3000/messages/3/7`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#36393e', }}>
       <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <FlatList
          style={{marginLeft: 16}}
          data={messages}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text style={{color: '#fff'}}>{item.message}</Text>}
          />
        <TextInput
          style={{ backgroundColor: '#fff', height: 60 }}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          />
        <Button title="Send" onPress={sendMessage} />
        </SafeAreaView>
    </View>
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
});

export default MainPage;