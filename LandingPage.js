import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import bee from './assets/bee.png';

var width = Dimensions.get('window').width;

const LandingPage = () => {
  return (
      <View style={styles.container}>
          <View style={styles.topContainer}>
              <Text style={styles.name}>RIFF</Text>
            <View style={styles.beeContainer}>
              <Image source={bee} style={styles.beeImg} />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.welcome}>Welcome to Riff</Text>
            <Text style={styles.topsubwelcome}>Join people who use Riff to talk with</Text>
            <Text style={styles.bottomsubwelcome}>communities and friends.</Text>
              <TouchableOpacity style={styles.button} >
                  <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  name: {
      fontSize: 48,
      color: '#fff',
  },
  button: {
    backgroundColor: '#7289da',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: width * .8,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  beeContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  beeImg: {
    width: 60,
    height: 60,
  },
  welcome: {
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
  topsubwelcome: {
    color: '#7F7F7F',
    topPadding: 10,
  },
  bottomsubwelcome: {
    color: '#7F7F7F',
    bottomPadding: 10,
  },
});

export default LandingPage;