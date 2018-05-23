import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import ScanScreen from './screens/scan';
import SettingsScreen from './screens/settings';

import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';




export default createBottomTabNavigator({
  Home: HomeScreen,
  Scan: ScanScreen,
  Settings: SettingsScreen,
},

{
  
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      } else if (routeName === 'Scan') {
        iconName = `ios-qr-scanner${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}

);