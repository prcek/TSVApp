
import React from 'react';
import { Text, View } from 'react-native';

export default class TicketScreen extends React.Component {
    static navigationOptions = {
      title: 'ticket',
    };
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Ticket!</Text>
        </View>
      );
    }
}

