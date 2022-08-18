import React from 'react';
import { LogBox } from 'react-native';
import AuthNavigation from './AuthNavigation';

const App = () => {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.'])
  LogBox.ignoreLogs(['@firebase/firestore: Firestore (9.9.2): Uncaught Error in snapshot listener: {"code":"permission-denied","name":"FirebaseError","line":23479,"column":64,"sourceURL":"http://localhost:8081/index.bundle?platform=android&dev=true&minify=false&app=com.igclone&modulesOnly=false&runModule=true"}'])
  return (
    <AuthNavigation />
  );
};
export default App;
