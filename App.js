import * as React from 'react';

import AppNavigation from './src/components/AppNavigation';
import Auth from './src/components/Auth';
import { auth } from './src/config/firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    if (this.state.user) return <AppNavigation />;
    else return <Auth />;
  }
}
