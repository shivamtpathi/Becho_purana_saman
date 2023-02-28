import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const TextInputs = ({label, type,value,changeValue,lines}) => {
 


 





  return (
    <TextInput
      label={label}
      value={value}
      keyboardType={type}
      onChangeText={text => changeValue(text)}
      mode="outlined"
      numberOfLines={3}
      multiline={true}
      
    />
  );
};

export default TextInputs;

const styles = StyleSheet.create({});
