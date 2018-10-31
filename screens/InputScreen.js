
import React from 'react';
import { Text, View } from 'react-native';
import TicketInput from '../components/TicketInput';

export default class InputScreen extends React.Component {
    static navigationOptions = {
      title: 'Ruční zadání kódu vstupenky',
    };
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
              <TicketInput />
        </View>
      );
    }
}

