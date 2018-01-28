import * as React from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { dbRef } from '../config/firebase';
import { navigationOptions } from '../config/navOptions';
import MeetupCard from './MeetupCard';

const { width, height } = Dimensions.get('window');

export default class MeetupGroupInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      events: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    ...navigationOptions,
    title: `Acerca de ${navigation.state.params.groupName}`,
  });

  componentWillMount() {
    const { navigation } = this.props;

    dbRef
      .child(`groups/${navigation.state.params.groupId}`)
      .once('value', snapshot => {
        this.setState({
          info: snapshot.val(),
        });
      });

    dbRef
      .child('events')
      .orderByChild('groupId')
      .equalTo(navigation.state.params.groupId)
      .on('child_added', snapshot => {
        this.setState(prevState => ({
          events: prevState.events.concat(snapshot.val()),
        }));
      });
  }

  componentWillUnmount() {
    dbRef.child(`events/${this.props.navigation.state.params.groupId}`).off();
    dbRef.child('events').off();
  }

  render() {
    const { info, events } = this.state;

    return (
      <ScrollView style={styles.container}>
        {info ? (
          <View>
            <Image style={styles.image} source={{ uri: info.image }} />
            <Text style={styles.title}>{info.name}</Text>
            <Text style={styles.about}>{info.about}</Text>
            <Text style={styles.title}>Últimos eventos</Text>
            {events.length > 0 && (
              <View>
                {events.map(event => (
                  <MeetupCard
                    key={event.id}
                    navigation={this.props.navigation}
                    event={event}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator style={styles.loader} size={100} color="red" />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: 220,
  },
  title: {
    padding: 20,
    textAlign: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  about: {
    margin: 15,
  },
});
