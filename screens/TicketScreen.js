
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { compose, withApollo} from "react-apollo";
import Styles from '../constants/Styles';
import { withNavigation } from 'react-navigation';
import Ticket from '../components/Ticket';
import gql from 'graphql-tag';
import Moment from 'moment';


const GQL_GET_TICKET=gql`
query EventTicketGet($ticket_key: String!) {
  eventTicketGet(ticket_key:$ticket_key) {
    event_id
    name
    cost
    status
    used
    used_by
    used_datetime
  }
}
`;



class TicketScreen extends React.Component {
    static navigationOptions = {
      title: 'ticket',
    };

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    

   


    render() {
      const { navigation } = this.props;
      const ticket_key = navigation.getParam('ticket_key', 'NO-TICKET');
      const backTo = navigation.getParam('backTo', 'Scan');
      return (
        <View style={Styles.screen_view}>
          <Text>Ticket!</Text>
          {ticket_key && (
            <Ticket ticket_key={ticket_key} backTo={backTo}/>
          )}
        </View>
      );
    }
}


function mapStateToProps(state) {
  return { 
      auth_ok: state.auth.ok,
  }
}


export default compose(
  withNavigation,
  withApollo,
  connect(mapStateToProps,{}),
)(TicketScreen);
