// import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet, Image, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';


const SignupScreen = ({navigation}) => {
  const [loading,setLoading]=useState(false)
  const createUser = async (email, password) => {
    if(email==''){
      alert("Please Enter Email")
      return 
    }

    if(password=='' || password.length<8){
      alert("Please Enter Password Carefully")
      return 
    }
    
    
    try {
      setLoading(true)
    const res= await auth().createUserWithEmailAndPassword(email, password);
    console.log(res)
     alert("Account created successfully")
     navigation.navigate('LoginScreen')
  
    } catch (error) {
      setLoading(false)
      alert(error);
    }
  };
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
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
          onChangeText={text => setemail(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Create password"
          value={password}
          onChangeText={text => setpassword(text)}
        />
        
      </View>
      <TouchableOpacity style={styles.btn}
     
      onPress={() => createUser(email, password)}
      >
        {!loading ? <Text style={styles.btnText}>SignUp</Text>
      : <ActivityIndicator size='small' color='white' />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkBtn}>
        
      </TouchableOpacity>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
      <TouchableOpacity
             onPress={() => navigation.goBack()}

      
      ><Text style={styles.link}>Login</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
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
  signupTextContainer:{
flexDirection:"row",
marginTop:10,
alignItems:"center"
  },
  signupText:{
marginHorizontal:6,
textAlign: 'center',
  },
});
