import { io } from "socket.io-client";
import Constants from 'expo-constants';

const socket = io.connect(`http://${Constants.manifest?.extra?.apiUrl}:3000`);

export default socket;