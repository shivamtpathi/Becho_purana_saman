import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import React, {useState} from 'react';

import TextInputs from '../../component/TextInputs';
import {ActivityIndicator} from 'react-native-paper';

const PostScreen = () => {
  const [name, setname] = useState('');
  const [desc, setdesc] = useState('');
  const [year, setyear] = useState('');
  const [price, setprice] = useState('');
  const [number, setnumber] = useState('');
  const [loading, setloading] = useState(false);
  const postData = async () => {
    try {
      setloading(true);
      await firestore().collection('post').add({
        name,
        desc,
        year,
        price,
        number,
        image: 'https://picsum.photos/700',
        uid: auth().currentUser.uid,
      });
      setloading(false);
      Alert.alert('Uploaded');
    } catch (error) {
      Alert.alert('something went wrong.please try again');
    }
  };

  return (
    <KeyboardAvoidingView behavior='position' style={{flex: 1}}>
      <Text
        style={{
          fontSize: 22,
          alignSelf: 'center',
          fontWeight: '600',
          margin: 22,
        }}>
        Create Post!
      </Text>

      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <TextInputs
          label="Enter Product Name"
          value={name}
          changeValue={setname}
        />
      </View>
      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <TextInputs label="About Product" value={desc} changeValue={setdesc} />
      </View>
      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <TextInputs
          label="Enter Year"
          value={year}
          changeValue={setyear}
          type="number-pad"
        />
      </View>
      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <TextInputs
          label="Enter Price"
          value={price}
          changeValue={setprice}
          type="number-pad"
        />
      </View>
      <View style={{paddingHorizontal: 12, marginTop: 12}}>
        <TextInputs
          label="Enter Your Mobile Number"
          value={number}
          changeValue={setnumber}
          type="number-pad"
        />
      </View>

      <View style={{marginTop: 20, paddingHorizontal: 12}}>
        <Button title="Upload Image" />
      </View>
      <View style={{marginTop: 10, paddingHorizontal: 12}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Post" onPress={() => postData()} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({});
