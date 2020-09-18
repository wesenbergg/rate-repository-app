import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
// import { StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
};

export default App;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
