import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();


export default function HomeScreen() {
  const { user } = useAuthentication();

  // we can get private info like this
  // axios.get('/private', {
  //   headers: {
  //     Authorization: user.token,
  //   },
  // })

  // and then on the server side ...

  // const admin = require('firebase-admin');

  // // Initialize Firebase Admin SDK
  // admin.initializeApp();

  // // Connect to your other database
  // const otherDb = require('other-db-library');

  // app.get('/private', async (req, res) => {
  //   // Verify the user's JWT token
  //   try {
  //     const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization);
  //     // Use the uid from the decoded token to retrieve the user's private data from other db
  //     const privateData = await otherDb.find({ userId: decodedToken.uid });
  //     res.send(privateData);
  //   } catch (error) {
  //     res.status(401).send('Unauthorized');
  //   }
  // });

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
})