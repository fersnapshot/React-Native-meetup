import * as React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { dbRef, auth } from '../config/firebase';
import { navigationOptions } from '../config/navOptions';

export default class MeetupDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      assistants: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    ...navigationOptions,
    title: `Evento de ${navigation.state.params.groupName}`,
  });

  componentWillMount() {
    const { navigation } = this.props;

    dbRef
      .child(`events/${navigation.state.params.id}`)
      .once('value', snapshot => {
        this.setState({
          event: snapshot.val(),
        });
      });

    dbRef
      .child(`eventAttendees/${navigation.state.params.id}`)
      .on('child_added', snapshot => {
        this.setState(prevState => ({
          assistants: prevState.assistants.concat(snapshot.val()),
        }));
      });
  }

  componentWillUnmount() {
    const { navigation } = this.props;

    dbRef.child(`eventAttendees/${navigation.state.params.id}`).off();
    dbRef.child('eventAttendees').off();
  }

  booking = () => {
    const userUID = auth.currentUser.uid;
    const eventID = this.props.navigation.state.params.id;

    dbRef.child(`users/${userUID}`).once('value', snapshot => {
      const { email, uid, avatar } = snapshot.val();

      dbRef
        .child('eventAttendees')
        .child(eventID)
        .child(userUID)
        .set({
          uid,
          email,
          avatar,
        });
    });
  };

  render() {
    const { event } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.coverImage}
          source={require('../assets/meetup-event.jpg')}
        />
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.info}>
          <FontAwesome
            style={styles.infoIcon}
            name="calendar-o"
            size={20}
            color="grey"
          />
          <View>
            <Text style={styles.infoText}>{moment(event.date).fromNow()}</Text>
            <Text style={styles.infoSubText}>
              {moment(event.date).format('LLLL')}
            </Text>
          </View>
        </View>
        <View style={styles.info}>
          <FontAwesome
            style={styles.infoIcon}
            name="map-marker"
            size={20}
            color="grey"
          />
          <View>
            <Text style={styles.infoText}>{event.location}</Text>
            <Text style={styles.infoSubText}>{event.locationAddress}</Text>
          </View>
        </View>
        {this.state.assistants.length > 0 && (
          <View style={styles.info}>
            {this.state.assistants.map(attendee => (
              <Image
                key={attendee.uid}
                style={styles.imageAvatar}
                source={{ uri: attendee.avatar }}
              />
            ))}
          </View>
        )}
        <View style={styles.info}>
          <TouchableHighlight style={styles.rsvpBtn} onPress={this.booking}>
            <Text style={styles.rsvpText}>Apuntarse</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{event.description}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coverImage: {
    flex: 1,
    height: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  info: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  infoIcon: {
    margin: 10,
  },
  infoText: {
    color: 'grey',
    fontSize: 17,
  },
  imageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 5,
  },
  rsvpBtn: {
    flex: 1,
    backgroundColor: 'red',
    margin: 15,
    padding: 10,
    borderRadius: 3,
  },
  rsvpText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    backgroundColor: '#eaeaea',
    borderTopWidth: 1,
    borderColor: '#aaa',
    padding: 20,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 17,
  },
});
