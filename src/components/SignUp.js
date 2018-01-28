import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';

import { navigationOptions } from '../config/navOptions';
import { auth, dbRef } from '../config/firebase';
import { generateAvatarURL } from '../utils/gravatar';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Regístrate',
  });

  createUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(result => {
      dbRef.child(`users/${result.uid}`).set({
        uid: result.uid,
        email: result.email,
        avatar: generateAvatarURL(),
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/logo-meetup.png')}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          placeholder="Tu email..."
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          placeholder="Tu constraseña..."
          value={this.state.password}
        />
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => this.createUser(this.state.email, this.state.password)}
        >
          <Text style={styles.textBtn}>Crea una cuenta nueva</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{ textAlign: 'center' }}>
            ¿Tienes cuenta? Accede desde aquí
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 40,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 50,
  },
  input: {
    padding: 10,
    fontSize: 18,
    borderColor: 'orangered',
  },
  loginBtn: {
    backgroundColor: 'orange',
    marginVertical: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 3,
  },
  textBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
