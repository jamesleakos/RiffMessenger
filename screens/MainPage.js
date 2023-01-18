import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SectionList, Button, StyleSheet, StatusBar, FlatList, TextInput, SafeAreaView, Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import socket from '../utils/hooks/socket';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";
import axios from 'axios';

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

var width = Dimensions.get('window').width;

const ChatScreen = ({server, channel, messages, setMessages}) => {
  const [text, setText] = useState('');
  useEffect(() => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/messages/${server}/${channel}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log('Error in chat screen ', error.message);
      });
  }, [channel]);

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

const LeftDrawerContent = ({servers, setServer, setChannel, setUserList, setMessages}) => {
  const [channels, setChannels] = useState([])
  const loadChannels = (id) => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/channels/${id}`)
      .then(response => {
        setChannels(response.data);
        setServer(id);
        setMessages([])
        axios.get(`${Constants.manifest?.extra?.apiUrl}/server/${id}/users`)
          .then(response => {
            setUserList(response.data);
          })
          .catch(error => {
            console.log('Error getting users in server ', error.message);
          });
      })
      .catch(error => {
        console.log('Error getting channels ', error.message);
      });
  }
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 1}}>
        {servers.map((server) => {
          return (<Pressable style={styles.item} onPress={() => loadChannels(server.id)}>
            <Text style={styles.title}>{server.server_name}</Text>
          </Pressable>)
        })}
      </SafeAreaView>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 3}}>
        {channels.map((channel) => {
          return (<Pressable style={styles.item} onPress={() => setChannel(channel.id)}>
            <Text style={styles.title}>{channel.channel_name}</Text>
          </Pressable>)
        })}
      </SafeAreaView>
    </View>
  );
}

const RightDrawerContent = ({userList}) => {
  const onlineUsers = [];
  const offlineUsers = [];
  userList.forEach((user) => {
    if (user.online) onlineUsers.push(user.username)
    else if (!user.online) offlineUsers.push(user.username)
  })
  const DATA = [
    {
      title: 'Online',
      data: onlineUsers,
    },
    {
      title: 'Offline',
      data: offlineUsers,
    },
  ];
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
        renderSectionHeader={({section: {title, data}}) => (
          <Text style={styles.header}>{title} - {data.length}</Text>
        )}
      />
    </View>
  );
}

const LeftDrawerScreen = () => {
  const [messages, setMessages] = useState([]);
  const [servers, setServers] = useState([])
  const [server, setServer] = useState(0)
  const [channel, setChannel] = useState(0)
  const [userList, setUserList] = useState([])
  useEffect(() => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/servers/1`)
      .then(response => {
        setServers(response.data);
      })
      .catch(error => {
        console.log('Error getting servers ', error.message);
      });
  }, [])

  return (
    <LeftDrawer.Navigator
      id="LeftDrawer"
      defaultStatus="open"
      drawerContent={(props) => <LeftDrawerContent {...props} servers={servers} setServer={setServer} setChannel={setChannel} setUserList={setUserList} setMessages={setMessages} />}
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
      <LeftDrawer.Screen name="Channel">
        {(props) => <RightDrawerScreen {...props} server={server} channel={channel} userList={userList} messages={messages} setMessages={setMessages} />}
      </LeftDrawer.Screen>
    </LeftDrawer.Navigator>
  );
}

const RightDrawerScreen = ({server, channel, userList, messages, setMessages}) => {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={(props) => <RightDrawerContent {...props} userList={userList} />}
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
      <RightDrawer.Screen name="HomeDrawer">
        {(props) => <ChatScreen {...props} server={server} channel={channel} messages={messages} setMessages={setMessages} />}
      </RightDrawer.Screen>
    </RightDrawer.Navigator>
  );
}

const MainPage = ({ navigation, friends }) => {
  // console.log('friends in main page', friends);
  return (
    <LeftDrawerScreen />
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