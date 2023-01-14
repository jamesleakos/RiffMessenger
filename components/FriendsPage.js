import React from 'react';
import {
   View, Text, StyleSheet, TouchableOpacity, Dimensions, Image
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

function FriendsPage() {
  const [friends, setFriends] = useState([
    {
      name: 'friend1',
      avatar: '(AVATAR)',
      online: false,
    },
    {
      name: 'friend2',
      avatar: '(AVATAR)',
      online: true,
    },
    {
      name: 'friend3',
      avatar: '(AVATAR)',
      online: true,
    },
    {
      name: 'friend4',
      avatar: '(AVATAR)',
      online: true,
    },
    {
      name: 'friend5',
      avatar: '(AVATAR)',
      online: true,
    },
  ]);
  return (
    <View>
      This is the friends page
      <View>Online</View>
      {friends.map((friend) => (
        !friend.online ? null
          : (
            <View>
              {friend.avatar}
              {friend.name}
            </View>
          )
      ))}
      <View>Offline</View>
      {friends.map((friend) => (
        friend.online ? null
          : (
            <View>
              {friend.avatar}
              {friend.name}
            </View>
          )
      ))}
    </View>
  );
}

export default FriendsPage;
