import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import LandingPage from './LandingPage'

export default function App() {

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
