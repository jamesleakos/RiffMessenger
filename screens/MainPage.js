import React from 'react';
import { View, Text, Dimensions, SectionList, Button, StyleSheet, StatusBar, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#36393e', }}>
      <Text style={{ color: '#fff' }}>CHAT GOES HERE</Text>
    </View>
  );
}

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