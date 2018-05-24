


import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';
//import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
 


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'home',
  };

  async componentWillMount() {
    console.log('componentWillMount');
    const {err,keys} = await AsyncStorage.getAllKeys();
    console.log("AsyncStorage:",keys);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!?!?</Text>
      </View>
    );
  }
}


