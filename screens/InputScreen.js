
import React from 'react';
import {  View, KeyboardAvoidingView } from 'react-native';
import TicketInput from '../components/TicketInput';
import NoAuthWarn from '../components/NoAuthWarn';
import CurrentEvent from '../components/CurrentEvent';
import Styles from '../constants/Styles';

export default class InputScreen extends React.Component {
    static navigationOptions = {
      title: 'Ruční zadání kódu vstupenky',
    };

    _handleTicket = (t) => {
      alert("ticket:"+t);
    }
    
    render() {
      return (
        <View style={Styles.screen_view}>
          <NoAuthWarn />
          <CurrentEvent />
          <TicketInput onTicket={this._handleTicket} />
        </View>
      );
    }
}

