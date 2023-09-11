/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';//----------------------------------> push notification
import firebaseimg from './firebase';//---------------------> firebase storage
import Chatnavigation from './Chatnavigation';//------------> firebase chat 
import TaskNavi from './TaskArch/TaskNavi';//--------------->storyTask
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => TaskNavi);
