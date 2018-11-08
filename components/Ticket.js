import React from 'react';
import { Text, Button } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../constants/Styles';
import { compose, withApollo} from "react-apollo";
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';

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

/*
  {key:"RESERVATION",label:"rezervace"},
    {key:"SOLD",label:"prodaná"},
    {key:"SELLING",label:"čeká na platbu"},
    {key:"BOOKED",label:"v košíku"},
    {key:"CANCELLED",label:"stornovaný"},
    {key:"ERROR",label:"chyba"},
    */

function ticketStatusAsText(s) {
  switch (s) {
    case 'RESERVATION': return "jen rezervace";
    case 'SOLD': return "zaplacená";
    case 'SELLING': return "nezaplacená";
    case 'BOOKED': return "jen v košíku";
    case 'CANCELLED': return "stornovaná";
    default:
  }
  return s;
}

class Ticket extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      ticket:null,
      ticket_err:false,
      ticket_not_found:false,
    }
  }

  gqlFetch(ticket_key) {
    this.props.client.query({
      query:GQL_GET_TICKET,
      variables:{ ticket_key},
      fetchPolicy:"network-only"
    }).then(res => {
      let ticket  = null;
      let ticket_not_found = true;
      if (res.data && res.data.eventTicketGet) {
        console.log("GOT TICKET",res.data.eventTicketGet);
        ticket = res.data.eventTicketGet;
        ticket_not_found = false;
      } else {
        console.log("TICKET NOT FOUND",ticket_key);
      }
      this.setState({loading:false,ticket,ticket_not_found,ticket_err:false})
    }).catch(err=>{
      console.error("ticket get error",err);
      this.setState({loading:false,ticket:null,ticket_not_found:false,ticket_err:true})
    })

  }


  fetchTicket() {
    const { auth_ok, ticket_key } = this.props;
    console.log("Ticket, fetchTicket")
    if (auth_ok && ticket_key && ticket_key.length>0 && ticket_key!="NO-TICKET") {
      console.log("Ticket, loading ticket",ticket_key);
      this.setState({loading:true, ticket:null,ticket_not_found:false,ticket_err:false},()=>{
        this.gqlFetch(ticket_key);
      })
    }
  }

  componentDidMount() {
    console.log("Ticket, DidMount")
    this.fetchTicket();
  }

  componentDidUpdate(prevProps) {
    console.log("Ticket, DidUpdate")
    //console.log("TicketScreen, DidUpdate", prevProps, this.props)
    if (prevProps.ticket_key!=this.props.ticket_key) {
      this.fetchTicket();
    }
  }

  _handleReload = ()=>{
    this.fetchTicket();
  }

  _handleEntry = ()=>{
   // this.fetchTicket();
  }

  _toScan = ()=>{
    this.props.navigation.navigate('Scan');
  };

  _toManual = ()=>{
    this.props.navigation.navigate('Input');
  };

  renderScanButtons() {
    return (
      <React.Fragment>
          <Button
              style={Styles.button}
              onPress={this._toScan}
              title="skenovat jinou"
          />
          <Button
              style={Styles.button}
              onPress={this._toManual}
              title="zadat ručně jinou"
          />
      </React.Fragment>
    )
  }

  renderTicketInfo(ticket) {
    return (
      <React.Fragment>
        <Text>Typ: {ticket.name}</Text>
        <Text>Cena: {ticket.cost}</Text>
      </React.Fragment>
    )
  }

  render() {
    const {event_id,auth_ok,ticket_key,backTo}  = this.props;
    const {loading,ticket,ticket_err,ticket_not_found} = this.state
    const scanBtns = this.renderScanButtons();
    if (loading) {
      return (
        <Text> hledám vstupenku.... </Text>
      )
    }
    if (ticket_err) {
      return (
        <React.Fragment>
          <Text style={Styles.text_ko}>Chyba při hledání vstupenky. Jste online a přihlášený(á)?</Text>
          <Button
              style={Styles.button}
              onPress={this._handleReload}
              title="zkusit znova"
          />
        </React.Fragment>
      )
    }

    if (ticket_not_found || ticket==null) {
      return (
        <React.Fragment>
          <Text style={Styles.text_ko}>nenalezeno</Text>
          {scanBtns}
          <Button
              style={Styles.button}
              onPress={this._handleReload}
              title="zkusit znova"
          />
        </React.Fragment>
      )
    }
    if (ticket.event_id != event_id) { 
      return (
        <React.Fragment>
          <Text style={Styles.text_ko}>Vstupenka z jiné akce</Text>
          {scanBtns}
        </React.Fragment>
      )
    }
    if (ticket.status != "SOLD") {
      return (
        <React.Fragment>
          <Text style={Styles.text_ko}>Neplatná vstupenka - {ticketStatusAsText(ticket.status)}</Text>
          {scanBtns}
        </React.Fragment>
      )
    }
    let ticket_info = this.renderTicketInfo(ticket);
    if (ticket.used) {
      return(
        <React.Fragment>
        <Text style={Styles.text_ko}>Použitá vstupenka</Text>
          {ticket_info}
          {scanBtns}
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
      <Text style={Styles.text_ok}>Platná vstupenka</Text>
        {ticket_info}

        <Button
          style={Styles.button}
          onPress={this._handleEntry}
          title="zaevidovat vstup"
        />
        {scanBtns}
      </React.Fragment>
    )
    //return <Text style={Styles.text_ok}>{JSON.stringify({props:{backTo,event_id,auth_ok,ticket_key},state:{loading,ticket,ticket_err,ticket_not_found}})}</Text>
  }
}


function mapStateToProps(state) {
  return { 
      auth_ok: state.auth.ok,
      event_id:state.event.event_id,
  }
}


export default compose(
  withApollo,
  withNavigation,
  connect(mapStateToProps,{}),
)(Ticket);
