
import React from 'react';
import {  View, KeyboardAvoidingView } from 'react-native';
import TicketInput from '../components/TicketInput';
import NoAuthWarn from '../components/NoAuthWarn';
import CurrentEvent from '../components/CurrentEvent';
import Styles from '../constants/Styles';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import { compose } from "react-apollo";


class InputScreen extends React.Component {
    static navigationOptions = {
      title: 'Ruční zadání kódu vstupenky',
    };

    _handleTicket = (t) => {
      this.props.navigation.navigate('Ticket',{ticket_key:t,backTo:'Input'});
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




export default compose(
  withNavigation,
)(InputScreen);
