


import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';



export default class HomeScreen extends React.Component {
  render() {
    const { isFocused } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home! {isFocused?"focus":"no focus"}</Text>
        <MaterialCommunityIcons name="qrcode-scan" size={25} color={"gray"} />
      </View>
    );
  }
}


