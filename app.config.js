import 'dotenv/config';

module.exports = {
  name: 'MyApp',
  version: '1.0.0',
  extra: {
    // react native won't let us use local host so you must use your local ip address
    // type ipconfig getifaddr en0 in terminal if on wifi
    // type ipconfig getifaddr en1 in terminal if using ethernet
    apiUrl: process.env.API_URL, // You have to run: "API_URL="http://YOURIPADDRESS:3000" npx expo start" ... every time
    // I will likely find a better way to do this later

    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID
  },
};