import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Constants from 'expo-constants';
import axios from 'axios';

export default function App() {
  const [testData, setTestData] = useState('initial Data');
  useEffect(() => {
    axios.get(`${Constants.expoConfig.extra.apiUrl}/test`)// look in app.config.js to configure this variable
      .then((response) => {
        setTestData(response.data);
      })
      .catch((err) => {
        console.log('ERROR :', err.message);
      })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LandingPage />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
