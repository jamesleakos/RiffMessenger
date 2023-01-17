// Account
  // username
  // Email
  // password
  // delete account
  // set status
  // Friend requests

import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
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
});

function Account() {
  return (
    <View style={styles.container}>
      <Text>Account Page</Text>
    </View>
  );
}

export default Account;
