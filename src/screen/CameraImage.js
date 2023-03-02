// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'


import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import * as Progress from 'react-native-progress';

const CameraImage = () => {
const[imgsrc,setimgsrc]=useState(" ")
    // const [image, setImage] = useState(null);
    // const [uploading, setUploading] = useState(false);
    // const [transferred, setTransferred] = useState(0);



// ...................Image Selection......................

const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => {
        console.log('Response = ', response.assets[0].uri);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { 
            uri: response.uri 
          }
      
}}) }



  return (
    <SafeAreaView style={{flex:1}}>
      <TouchableOpacity  onPress={selectImage}>
        <Text >Pick an image</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  )
}

export default CameraImage;

