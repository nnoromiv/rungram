import React from 'react';
import { LogBox } from 'react-native';
import AuthNavigation from './AuthNavigation';

const App = () => {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.'])
  return (
    <AuthNavigation />
  );
};
export default App;
