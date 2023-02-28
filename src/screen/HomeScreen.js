// import Listitem from './Listitem';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Listitem from './Listitem';

const HomeScreen = () => {
  const [item, setitem] = useState([]);
  const [loadind, setloading] = useState(false);
  const GetDetail = async() => {
   
    
      const snapshot = await firestore()
        .collection('post')
        // .where('uid', '==', auth().currentUser.uid)

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

  const renderContentList = ({item}) => {
    return <Listitem item={item} />;
  };
  return (
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
  );
};

export default HomeScreen;


