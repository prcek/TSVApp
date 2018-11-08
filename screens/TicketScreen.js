
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { compose } from "react-apollo";
import Styles from '../constants/Styles';
import { withNavigation } from 'react-navigation';

class TicketScreen extends React.Component {
    static navigationOptions = {
      title: 'ticket',
    };

    fetchTicket() {
      const { navigation } = this.props;
      console.log("TicketScreen, fetchTicket")
      const ticket_key = navigation.getParam('ticket_key', 'NO-TICKET');
      if (ticket_key!="NO-TICKET") {
        console.log("TicketScreen, loading ticket",ticket_key);
      }
    }

    componentDidMount() {
      console.log("TicketScreen, DidMount")
      this.fetchTicket();
    }

    componentDidUpdate() {
     
      console.log("TicketScreen, DidUpdate")
      this.fetchTicket();
    }

    render() {
      const { navigation } = this.props;
      const ticket_key = navigation.getParam('ticket_key', 'NO-TICKET');
      return (
        <View style={Styles.screen_view}>
          <Text>Ticket!</Text>
          {ticket_key && (
            <Text style={Styles.text_ok}>{ticket_key}</Text>
          )}
        </View>
      );
    }
}


function mapStateToProps(state) {
  return { 
      auth_ok: state.auth.ok,
      ticket_key: state.event.ticket_key
  }
}


export default compose(
  withNavigation,
  connect(mapStateToProps,{}),
)(TicketScreen);
