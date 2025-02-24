// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { Text, View } from 'react-native';
import AppNavigation from './src/navigation';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <AppNavigation/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
