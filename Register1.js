import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, SafeAreaView, TextInput } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import bee from './assets/bee.png';

var width = Dimensions.get('window').width;

const Register1 = ({ navigation }) => {
  const [phoneSelected, setPhoneSelected] = useState(true);
  const [emailSelected, setEmailSelected] = useState(false);

  const handlePhonePress = () => {
    setPhoneSelected(true);
    setEmailSelected(false);
  };

  const handleEmailPress = () => {
    setPhoneSelected(false);
    setEmailSelected(true);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.back}> &#60;  Back</Text>
         </TouchableOpacity>
         <Text style={styles.header}>Enter Phone or Email</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => handlePhonePress()}>
              <Text style={styles.buttonText}>Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleEmailPress()}>
              <Text style={styles.buttonText}>Email</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#fff"
            keyboardType="number-pad"
          />
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register2')}>
          <Text style={styles.buttonText}>Next</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    color: '#fff',
    padding: 5,
  },
  header: {
    fontSize: 30,
    color: '#fff',
  },
  optionContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    backgroundColor: '#7289da',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: width * .4,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7289da',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: width * .8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e2124',
    height: 40,
    color: '#fff'
  },
});

export default Register1;