
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




    render() {
      const {ticket_key} = this.props;
      const { navigation } = this.props;
      const itemId = navigation.getParam('ticket_key', 'NO-TICKET');
      return (
        <View style={Styles.screen_view}>
          <Text>Ticket!</Text>
          {itemId && (
            <Text style={Styles.text_ok}>{itemId}</Text>
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
