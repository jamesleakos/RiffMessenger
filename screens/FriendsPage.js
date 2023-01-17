import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  SectionList,
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection: 'column',
    backgroundColor: '#36393e',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  userText: {
    color: '#fff',
    margin: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    width,
    backgroundColor: '#36393e',
    // position: 'sticky',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    // position: 'sticky',
  },
  section: {
    margin: 10,
    width,
  },
  bottomText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 50,
    marginLeft: 30,
  },
  topBar: {
    backgroundColor: '#17181e',
    width,
    // position: 'sticky',
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    backgroundColor: '#17181e',
    width,
    position: 'absolute',
    bottom: 0,
    height: 90,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});

function FriendsPage({ navigation }) {
  const [friends, setFriends] = useState(
  //   [
  //   {
  //     name: 'friend1',
  //     avatar: '(AVATAR)',
  //     online: false,
  //   },
  //   {
  //     name: 'friend2',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend3',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend4',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend5',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend1',
  //     avatar: '(AVATAR)',
  //     online: false,
  //   },
  //   {
  //     name: 'friend2',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend3',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend4',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend5',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend1',
  //     avatar: '(AVATAR)',
  //     online: false,
  //   },
  //   {
  //     name: 'friend2',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend3',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend4',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend5',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend1',
  //     avatar: '(AVATAR)',
  //     online: false,
  //   },
  //   {
  //     name: 'friend2',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend3',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend4',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend5',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend1',
  //     avatar: '(AVATAR)',
  //     online: false,
  //   },
  //   {
  //     name: 'friend2',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend3',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend4',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  //   {
  //     name: 'friend5',
  //     avatar: '(AVATAR)',
  //     online: true,
  //   },
  // ]
    [{
      title: 'Online',
      data: ['friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5'],
    },
    {
      title: 'Offline',
      data: ['friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1'],
    }]
  );
  // todo add online/offline count to backend
  let onlineCount = 0;
  let offlineCount = 0;
  for (let i = 0; i < friends.length; i += 1) {
    if (friends[i].online) {
      onlineCount += 1;
    } else {
      offlineCount += 1;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Friends</Text>
      </View>
      {/* <ScrollView style={styles.section}>
        <View>
          <Text style={styles.sectionTitle}>
            Online -
            {' '}
            {onlineCount}
          </Text>
          {friends.map((friend, i) => (
            !friend.online ? null
              : (
                <Text style={styles.userText} key={i}>
                  {friend.avatar}
                  {'  '}
                  {friend.name}
                </Text>
              )
          ))}
        </View>
        <View>
          <Text style={styles.sectionTitle}>
            Offline
            {' '}
            {offlineCount}
          </Text>
          {friends.map((friend, i) => (
            friend.online ? null
              : (
                <Text style={styles.userText} key={i}>
                  {friend.avatar}
                  {'  '}
                  {friend.name}
                </Text>
              )
          ))}
        </View>
      </ScrollView> */}
      <SectionList
        style={styles.section}
        sections={friends}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <Text style={styles.userText}>{item}</Text>
        )}
        renderSectionHeader={({section: {title, data}}) => (
          <Text style={styles.sectionTitle}>{title} - {data.length}</Text>
        )}
        stickySectionHeadersEnabled={true}
      />

      {/* <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default FriendsPage;
