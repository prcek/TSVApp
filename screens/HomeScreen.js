


import React from 'react';
import { Constants } from 'expo';
import { AsyncStorage, Text, View , Button,FlatList} from 'react-native';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
import EventList from '../components/EventList';
import TicketInput from '../components/TicketInput';
import gql from 'graphql-tag';
var jwtDecode = require('jwt-decode');

const GQL_PING=gql`
query Ping {
  device_Ping(device_id:"x") {
    ok
  }
}
`;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'home',
  };

  constructor(props) {
    super(props);
    //console.log("HomeScreen constructor props",props)
  }

  _handleTest = () =>{
    console.log("handle test");
    this.props.client.query({query:GQL_PING})
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  /*
  componentWillMount() {
    console.log('componentWillMount');
    AsyncStorage.getAllKeys((err,keys)=>{
      console.log("AsyncStorage:",JSON.stringify(keys));
    });
  }
  */

  render() {
    const {auth_ok,event} = this.props;
    console.log("auth_ok",auth_ok);
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {auth_ok?(
          <Text>logged in</Text>
        ):(
          <Text>Please login first!</Text>
        )}
        <TicketInput />
        <EventList />
        <Button onPress={this._handleTest} title="test"/>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
      auth_ok: state.auth.ok,
      event: state.event
  }
}


export default compose(
  withApollo,
  connect(mapStateToProps,{}),
)(HomeScreen);
