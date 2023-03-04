// import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';










const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();



  const signin = async (email, password) => {
    if (email == '') {
      alert('Please Enter Email');
      return;
    }

    if (password == '' || password.length < 8) {
      alert('Please Enter Password Carefully');
      return;
    }

    try {
      setLoading(true);
      const res = await auth()
        .signInWithEmailAndPassword(email, password);
        

      setLoading(false);
      navigation.navigate('MyTabs');
    } catch (error) {
      setLoading(false);
      alert('Invalid Credentials');
    }
  };

  const navigationHandler = () => {
    navigation.navigate('MyTabs');
  };





  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // console.log("hello shivam")
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
  return (

    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require(`../image/logo.png`)} />
      </View>

      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          label="Enter email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => signin(email, password)}
        style={styles.btn}>
        {!loading ? (
          <Text style={styles.btnText}>Login</Text>
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => {
          navigation.navigate('Reset');
        }}>
        <Text style={styles.link}>forget password</Text>
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

return (
  <View>
 { navigation.navigate('MyTabs')}</View>
);
}





export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 400 / 2,
  },
  logoContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: 385,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  textInput: {
    marginVertical: 2,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 385,
    height: 50,
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontSize: 26,
  },
  link: {
    color: 'blue',
    fontSize: 17,
    textAlign: 'right',
  },
  linkBtn: {
    marginTop: 6,
    width: 385,
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  signupText: {
    marginHorizontal: 6,
    textAlign: 'center',
  },
});
