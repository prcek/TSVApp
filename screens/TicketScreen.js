
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import { compose, withApollo} from "react-apollo";
import Styles from '../constants/Styles';
import { withNavigation } from 'react-navigation';
import Ticket from '../components/Ticket';
import gql from 'graphql-tag';
import Moment from 'moment';
import NoAuthWarn from '../components/NoAuthWarn';
import CurrentEvent from '../components/CurrentEvent';
import Button from '../components/Button';


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
      title: 'Vstupenka',
    };

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    _toScan = ()=>{
      this.props.navigation.navigate('Scan');
    };

    _toManual = ()=>{
      this.props.navigation.navigate('Input');
    };

    render() {
      const { navigation } = this.props;
      const ticket_key = navigation.getParam('ticket_key', 'NO-TICKET');
      const backTo = navigation.getParam('backTo', 'Scan');
      const vt = (ticket_key && ticket_key.length>0 && ticket_key!='NO-TICKET')
      return (
        <View style={Styles.screen_view}>
          <NoAuthWarn />
          <CurrentEvent />
          {vt?(
            <React.Fragment>
              <Text style={Styles.text}>{ticket_key}</Text>
              <Ticket ticket_key={ticket_key} backTo={backTo}/>
            </React.Fragment>
          ):(
            <React.Fragment>
                <Text style={Styles.text_ko}>Naskenuj vstupenku nebo zadej kód ručně</Text>
               
                <Button
                    onPress={this._toScan}
                    title={"skenovat"}
                />
                <Button
                    onPress={this._toManual}
                    title={"zadat kód"}
                />
            </React.Fragment>
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
