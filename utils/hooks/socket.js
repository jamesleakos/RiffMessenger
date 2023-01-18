import { io } from "socket.io-client";
import Constants from 'expo-constants';

const socket = io.connect(`${Constants.manifest?.extra?.apiUrl}`);

export default socket;