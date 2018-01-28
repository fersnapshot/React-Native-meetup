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
import { auth } from '../config/firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Accede con tu cuenta',
  });

  authenticateUser = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
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
          onPress={() =>
            this.authenticateUser(this.state.email, this.state.password)
          }
        >
          <Text style={styles.textBtn}>Accede con tu cuenta</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={{ textAlign: 'center' }}>Crea tu cuenta aquí</Text>
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
