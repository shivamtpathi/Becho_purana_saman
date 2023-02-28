import {Linking, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Card, Title, Button, Paragraph} from 'react-native-paper';

const Listitem = ({item}) => {
  const phone =item.number;
  // console.log(phone)
  // console.log(item.number)
  const call = (phone) => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };
  return (
    <View>
      <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph style={styles.paragraph}>{item.desc}</Paragraph>
        </Card.Content>

        <Card.Cover source={{uri: `${item.image}`}} />
        <Card.Actions>
          <Button onPress={() => call(item.number)}>CAll Seller</Button>
          <Card.Content>
            <Paragraph
              style={styles.cardAction}>{`Price ${item.price}`}</Paragraph>
          </Card.Content>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Listitem;

const styles = StyleSheet.create({
  cardAction: {fontSize: 14, fontWeight: '600', marginLeft: 40},
  paragraph: {fontSize: 17},
  card: {backgroundColor: 'white', margin: 5},
});
