


import React from 'react';
import { Constants } from 'expo';
import { AsyncStorage, Text, View , Button} from 'react-native';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
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

  componentWillMount() {
    console.log('componentWillMount');
    AsyncStorage.getAllKeys((err,keys)=>{
      console.log("AsyncStorage:",JSON.stringify(keys));
    });
    
  }

  render() {
    const {auth_token} = this.props;
    console.log("auth_token",auth_token);
    if (auth_token) {
      const dt = jwtDecode(auth_token);
      console.log("DT:",dt)
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!?!?</Text>
        <Text>{Constants.deviceId}</Text>
        <Button onPress={this._handleTest} title="test"/>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
  }
}


export default compose(
  withApollo,
  connect(mapStateToProps,{}),
)(HomeScreen);
