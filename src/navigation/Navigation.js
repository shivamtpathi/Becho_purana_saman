import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginScreen from '../screen/LoginScreen';
import SignupScreen from '../screen/SignupScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostScreen from '../screen/PostScreen';
import AccountScreen from '../screen/AccountScreen';
import HomeScreen from '../screen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import auth from '@react-native-firebase/auth';
import ForgetPasswordScreen from '../screen/ForgetPasswordScreen';

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color="#900" />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="plus" size={30} color="#900" />
          ),
        }}
        name="Post"
        component={PostScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={30} color="#900" />
          ),
        }}
        name="Account"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const [authenticated, setAuthenticated] = useState("");

  
  
  
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="LoginScreen">
          <Stack.Screen name="MyTabs" component={MyTabs} />

         <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="Reset" component={ForgetPasswordScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {flex: 1},
});
