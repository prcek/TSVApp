import React from 'react';
import { Platform , Text} from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import TicketScreen from '../screens/TicketScreen';
import AuthScreen from '../screens/AuthScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
  
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Akce',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};


const ScanStack = createStackNavigator({
  Scan: ScanScreen
});

ScanStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-qr-scanner${focused ? '' : '-outline'}`
          : 'md-qr-scanner'
      }
    />
  ),
};

const TicketStack = createStackNavigator({
  Ticket: TicketScreen,
});

TicketStack.navigationOptions = {
  tabBarLabel: 'Vstupenka',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-paper${focused ? '' : '-outline'}`
          : 'md-paper'
      }
    />
  ),
};


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};


const AuthStack = createStackNavigator({
  Auth: AuthScreen,
});

AuthStack.navigationOptions = {
  tabBarLabel: 'Přihlášení',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-log-in${focused ? '' : '-outline'}` : 'md-log-in'}
    />
  ),
};

const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


export default createBottomTabNavigator({
 // Home:HomeScreen, 
 // Scan:ScanScreen,
 // Auth:AuthScreen,
  HomeStack,
  ScanStack,
  TicketStack,
  SettingsStack,
  AuthStack,
  InfoStack,
},{
  //initialRouteName:"ScanStack",
  //backBehavior:null,
  //initialRoute:"ScanStack",
  
});
