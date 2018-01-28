import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

const MeetupCard = ({ navigation, event }) => (
  <TouchableWithoutFeedback
    onPress={() =>
      navigation.navigate('Detail', {
        id: event.id,
        groupName: event.groupName,
      })
    }
  >
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: event.groupImage }} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{event.title}</Text>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('GroupInfo', {
              groupId: event.groupId,
              groupName: event.groupName,
            })
          }
        >
          <View>
            <Text>Organizado por {event.groupName}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    marginVertical: 3,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    margin: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MeetupCard;
