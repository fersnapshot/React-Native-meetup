import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Login from './Login';
import SignUp from './SignUp';

const Auth = TabNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'red',
        paddingTop: Platform.OS === 'android' ? 18 : 0,
      },
      indicatorStyle: {
        backgroundColor: '#eaeaea',
      },
    },
  }
);

export default Auth;
