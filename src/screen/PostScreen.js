import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


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
  const [imgloading, setimgloading] = useState(false);

  const [image, setimage] = useState(' ');
  const [imagesrc, setimagesrc] = useState(' ');


  const imageStorage = async () => {
    try {

    const uploadUri = image;
    // console.log(uploadUri)
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    // console.log(filename);

      setimgloading(true)
      const task = await storage().ref(filename).putFile(uploadUri);

      if (task.state === "success") {
        Alert.alert('Image uploaded');
      setimgloading(false)

      } else {
      setimgloading(false)

        Alert.alert('Image not uploaded');
      }

      const url = await storage().ref(filename).getDownloadURL();

// console.log(url)
setimagesrc(url)

    } catch (err) {
      setimgloading(false)

      console.log(err);
    }
  };



  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      await launchImageLibrary(options, response => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setimage(response.assets[0].uri);
          imageStorage();
          // console.log(response.assets[0].uri)
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(image);

  const postData = async () => {
    try {
      setloading(true);
      await firestore().collection('post').add({
        name,
        desc,
        year,
        price,
        number,
        image: imagesrc,
        uid: auth().currentUser.uid,
      });
      setloading(false);
      Alert.alert('Uploaded');
    } catch (error) {
      Alert.alert('something went wrong.please try again');
    }
  };

  // ...................Image Selection......................

  return (
    <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
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
      {imgloading ? 
      
      
      
      <ActivityIndicator />:
       <Button onPress={selectImage} title="Upload Image" />
        
        
       }
      </View>
      <View style={{marginTop: 10, paddingHorizontal: 12}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button  
          disabled={imgloading?true:false}
           title="Post" onPress={() => postData()} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostScreen;

// const styles = StyleSheet.create({});
