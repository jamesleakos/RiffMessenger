// dependencies
import React from 'react';
import Constants from 'expo-constants';

// imports
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// authorization import
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
const auth = getAuth();

var width = Dimensions.get('window').width;

export default function SignUp({ navigation }) {

  const [value, setValue] = React.useState({
    email: '',
    username: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      });
      return;
    }

    try {
      const {user} = await createUserWithEmailAndPassword(auth, value.email, value.password);
      console.log('posting to users');
      const res = await axios.post(`${Constants.manifest?.extra?.apiUrl}/users`, {
        username: value.username,
        firebase_id: user.uid
      });

      navigation.navigate('Sign In');

    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signup screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          // leftIcon={<Icon
          //   name='envelope'
          //   size={16}
          // />}
        />

        <Input
          placeholder='Username'
          containerStyle={styles.control}
          value={value.username}
          onChangeText={(text) => setValue({ ...value, username: text })}
          // leftIcon={<Icon
          //   name='envelope'
          //   size={16}
          // />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          // leftIcon={<Icon
          //   name='key'
          //   size={16}
          // />}
        />

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    width: width * .8
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});