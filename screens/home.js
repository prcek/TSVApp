


import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';



export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <MaterialCommunityIcons name="qrcode-scan" size={25} color={"gray"} />
      </View>
    );
  }
}


