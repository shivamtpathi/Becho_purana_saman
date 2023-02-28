import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useNavigation} from '@react-navigation/native';
import Listitem from './Listitem';

// import RnderItem from './RnderItem';

const AccountScreen = () => {
  const navigation = useNavigation();

  const [item, setitem] = useState([]);
  const [loadind, setloading] = useState(false);
  const GetDetail = async() => {
   
    
    const snapshot = await firestore()
      .collection('post')
      .where('uid', '==', auth().currentUser.uid)

      .get();
    const result = snapshot.docs.map(docSnap => docSnap.data());
    // console.log(result)
    setitem(result);
 

};
useEffect(() => {
  GetDetail();
  return () => {
    console.log('cleanup');
  };
}, []);
  const logoutHandler = async () => {
    try {
      const res = await auth().signOut();
      console.log(res);
      navigation.navigate('LoginScreen');
    } catch (err) {
      alert(err);
    }
  };
  const renderContentList = ({item}) => {
    return <Listitem item={item} />;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Your Email : {auth().currentUser.email}</Text>
      <TouchableOpacity onPress={logoutHandler} style={styles.btn}>
        <Text style={styles.btnText}>LogOut</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Your Post</Text>

      <FlatList
      data={item}
      // keyExtractor={item => item.number}
      onRefresh={() => {
        setloading(true);
        GetDetail();
        setloading(false);

      }}
      refreshing={loadind}
      renderItem={renderContentList}
    />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    width: 385,
    height: 50,
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal: 22,
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    marginTop: 22,
    alignSelf: 'center',
  },
});
