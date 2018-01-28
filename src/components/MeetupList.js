import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { dbRef } from '../config/firebase';
import { navigationOptions } from '../config/navOptions';
import MeetupCard from './MeetupCard';

const { width, height } = Dimensions.get('window');

class MeetupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: true,
    };
    console.log('width', width, ', height', height);
  }

  // Estilos en https://github.com/react-navigation/react-navigation/blob/master/
  // Options https://reactnavigation.org/docs/navigators/stack#Screen-Navigation-Options
  static navigationOptions = ({ navigation }) => ({
    ...navigationOptions,
  });

  componentWillMount() {
    dbRef.child('events').once('value', snapshot => {
      this.setState(prevState => ({
        events: prevState.events.concat(snapshot.val()),
        isLoading: false,
      }));
    });
  }

  render() {
    const { navigation } = this.props;

    return this.state.isLoading ? (
      <ActivityIndicator style={styles.loader} size={100} color="red" />
    ) : (
      <ScrollView style={styles.container}>
        {this.state.events.map(event => (
          <MeetupCard key={event.id} navigation={navigation} event={event} />
        ))}
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
    margin: 10,
    height,
  },
});

export default MeetupList;
