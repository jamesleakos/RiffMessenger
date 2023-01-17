import { io } from "socket.io-client";
import Constants from 'expo-constants';

// const socket = io.connect(`http://${Constants.manifest?.extra?.apiUrl}:3000`);

const socket = io.connect(`http://192.168.1.151:3000`);

export default socket;