import * as React from 'react';

import { View, Text, Button } from 'react-native';

import { auth } from '../config/firebase';

// Estilos en https://github.com/react-navigation/react-navigation/blob/master/
// Options https://reactnavigation.org/docs/navigators/stack#Screen-Navigation-Options
export const navigationOptions = {
  title: 'Meetup',
  headerRight: (
    <View style={{ marginRight: 16 }}>
      {/* auth.currentUser siempre es null */}
      <Text>{auth.currentUser ? auth.currentUser.email : ''}</Text>
      <Button color="orangered" title="Salir" onPress={() => auth.signOut()} />
    </View>
  ),
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTintColor: 'white',
};
