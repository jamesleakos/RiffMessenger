import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SectionList, Button, StyleSheet, StatusBar, FlatList, TextInput, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import socket from '../utils/hooks/socket';
import SafeViewAndroid from "../utils/hooks/SafeViewAndroid";
import moment from 'moment';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import axios from 'axios';
import SelectUsersModal from './SelectUsersModal';

import { UserId } from '../navigation/userStack'

const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

var {width, height} = Dimensions.get('window');

const ChatScreen = ({server, channel}) => {
  const [messages, setMessages] = useState([]);
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
    console.log(user.uid)
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
};

const LeftDrawerContent = ({servers, setServer, setChannel, setUserList, navigation}) => {
  const [channels, setChannels] = useState([])
  const loadChannels = (id) => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/channels/${id}`)
      .then(response => {
        setChannels(response.data);
        setServer(id);
        setChannel(response.data[0].id)
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
  const loadChannel = (id) => {
    setChannel(id)
    navigation.getParent('LeftDrawer').closeDrawer()
  }
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 1}}>
        {servers.map((server) => {
          return (<Pressable key={server.id} style={styles.server} onPress={() => loadChannels(server.id)}>
            <Text style={styles.title}>{server.server_name}</Text>
          </Pressable>)
        })}
      </SafeAreaView>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 3}}>
        {channels.map((channel) => {
          return (<Pressable key={channel.id} style={styles.item} onPress={() => loadChannel(channel.id)}>
            <Text style={styles.title}>{channel.channel_name}</Text>
          </Pressable>)
        })}
      </SafeAreaView>
    </View>
  );
}

const RightDrawerContent = ({userList}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
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
    <View style={{display: 'flex', flex: 1, alignItems: 'flex-start', marginHorizontal: 16}}>
      <SafeAreaView style={{...SafeViewAndroid.AndroidSafeArea, flex: 1}}>
        <SelectUsersModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedUser={selectedUser}
            currentScreen="userList"
          />
          <View style={styles.topBar}>
              <Text style={styles.topBarText}>
              Channel Name
            </Text>
          </View>
        <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.userItem}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSelectedUser(item);
                }}
              >
                  <Text style={styles.title}>{item}</Text>
                </TouchableOpacity>
            )}
            renderSectionHeader={({section: {title, data}}) => (
              <Text style={styles.header}>{title} - {data.length}</Text>
            )}
          />
      </SafeAreaView>
    </View>
  );
}

const LeftDrawerScreen = ({setDrawerStatus, navigation}) => {
  const userId = React.useContext(UserId);

  const [servers, setServers] = useState([])
  const [server, setServer] = useState(0)
  const [channel, setChannel] = useState(0)
  const [userList, setUserList] = useState([])
  useEffect(() => {
    axios.get(`${Constants.manifest?.extra?.apiUrl}/servers/${userId}`)
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
      drawerContent={(props) => <LeftDrawerContent {...props} servers={servers} setServer={setServer} setChannel={setChannel} setUserList={setUserList} />}
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
        {(props) => <RightDrawerScreen {...props} server={server} channel={channel} userList={userList} setDrawerStatus={setDrawerStatus} />}
      </LeftDrawer.Screen>
    </LeftDrawer.Navigator>
  );
}

const RightDrawerScreen = ({server, channel, userList, setDrawerStatus}) => {
  const drawerStatus = useDrawerStatus();
  useEffect(() => {
    setDrawerStatus(drawerStatus === 'open')
  }, [drawerStatus])
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
        {(props) => <ChatScreen {...props} server={server} channel={channel} />}
      </RightDrawer.Screen>
    </RightDrawer.Navigator>
  );
}

const MainPage = ({ navigation, setDrawerStatus, friends }) => {
  // console.log('friends in main page', friends);
  return (
    <LeftDrawerScreen setDrawerStatus={setDrawerStatus} navigation={navigation} />
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
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  topBarText: {
    fontSize: 20,
    color: '#fff',
  }
});

export default MainPage;