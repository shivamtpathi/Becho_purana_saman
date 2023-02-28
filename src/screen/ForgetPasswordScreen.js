import {StyleSheet, Text, View, Button, Alert} from 'react-native';
// import { Button } from 'react-native-paper';
import React, {useState} from 'react';
import auth, {sendPasswordResetEmail} from '@react-native-firebase/auth';
import TextInputs from '../../component/TextInputs';
import {ActivityIndicator} from 'react-native-paper';
const ForgetPasswordScreen = () => {
  const [email, setemail] = useState('');
  const [loading, setloadind] = useState(false);
  const forgotPassword = async () => {
    if (email == '') return Alert.alert('please enter your email');
    setloadind(true);
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setloadind(false);

        // Password reset email sent successfully
        Alert.alert(`link sent on your email ${email} successfully`);
      })
      .catch(error => {
        setloadind(false);

        // An error occurred while sending the password reset email
        Alert.alert('please check your information and try again');

        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 22,
          alignSelf: 'center',
          fontWeight: '600',
          margin: 22,
        }}>
        Forget Password !
      </Text>

      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <TextInputs
          label="Enter your registered email"
          value={email}
          changeValue={setemail}
        />
      </View>

      <View style={{marginTop: 20, paddingHorizontal: 12}}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button title="Reset" onPress={() => forgotPassword()} />
        )}
      </View>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({});
