import { StackNavigator } from 'react-navigation';

import MeetupList from './MeetupList';
import MeetupDetail from './MeetupDetail';
import MeetupGroupInfo from './MeetupGroupInfo';

const AppNavigation = StackNavigator({
  Home: { screen: MeetupList },
  Detail: { screen: MeetupDetail },
  GroupInfo: { screen: MeetupGroupInfo },
});

export default AppNavigation;
