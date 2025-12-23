// 1. Import the random number generator FIRST. 
// This is like putting on your safety goggles before using a saw.
import 'react-native-get-random-values';

// 2. Import the URL polyfill so we can talk to the internet correctly.
import 'react-native-url-polyfill/auto';

// 3. Teach the app what "Buffer" and "Process" are.
import { Buffer } from 'buffer';
global.Buffer = Buffer;
global.process = require('process');

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
