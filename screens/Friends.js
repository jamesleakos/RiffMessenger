// eslint-disable-next-line import/no-unresolved
import React, { useState, useEffect } from 'react';
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
} from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#36393e',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
    justifyContent: 'center',
    fontSize: 14,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#17181e',
    color: '#fff',
  },
  header: {
    color: '#fff',
    fontSize: 18,
    margin: 10,
    width,
    backgroundColor: '#36393e',
    borderBottomWidth: 1,
    borderColor: '#17181e',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
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
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

function FriendsPage({ friends }) {
  // const [friends, setFriends] = useState(
  //   [{
  //     title: 'Online',
  //     data: ['friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5', 'friend2', 'friend3', 'friend4', 'friend5'],
  //   },
  //   {
  //     title: 'Offline',
  //     data: ['friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1', 'friend1'],
  //   }],
  // );
  // todo add online/offline count to backend
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SectionList
          sections={friends}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Text style={{ color: '#fff' }}>{item}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title, data } }) => (
            <Text style={styles.header}>
              { title }
              {' - '}
              { data.length }
            </Text>
          )}
          stickySectionHeadersEnabled
        />
      </SafeAreaView>
    </View>
  );
}

export default FriendsPage;
