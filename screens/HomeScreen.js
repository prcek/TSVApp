


import React from 'react';
import { Constants } from 'expo';
import { AsyncStorage, Text, View , Button,FlatList} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
import EventList from '../components/EventList';
import TicketInput from '../components/TicketInput';
import gql from 'graphql-tag';
import NavContext from '../navigation/NavContext';
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
    title: 'Akce',
  };

  constructor(props) {
    super(props);
    //console.log("HomeScreen constructor props",props)
  }

  _handleTest = () =>{
    this.props.navigation.navigate("Scan");
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
    const {auth_ok,navigation} = this.props;
    console.log("auth_ok",auth_ok);
   
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {auth_ok?(
          <Text>logged in</Text>
        ):(
          <Text>Please login first!</Text>
        )}
        <NavContext.Consumer>
          {value => (<Text>{JSON.stringify(value)}</Text>)}
        </NavContext.Consumer>
        <Text>navigation state: {JSON.stringify(navigation.state)}</Text>
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
  withNavigation,
  connect(mapStateToProps,{}),
)(HomeScreen);
