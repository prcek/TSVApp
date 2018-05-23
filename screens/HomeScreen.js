


import React from 'react';
import { Text, View } from 'react-native';
//import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'home',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!?!?</Text>
      </View>
    );
  }
}


