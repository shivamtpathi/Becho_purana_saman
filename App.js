import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/Navigation'
import HomeScreen from './src/screen/HomeScreen';
import PostScreen from './src/screen/PostScreen';
import CameraImage from './src/screen/CameraImage';
import TestCode from './src/screen/TestCode';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
<Navigation/>
{/* <HomeScreen/> */}
{/* <TestCode/> */}
{/* <CameraImage/> */}
{/* <PostScreen/> */}

    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({ container:{flex:1,}})







function Main() {
  return (
    <PaperProvider >
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(App, () => Main);
