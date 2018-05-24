


import React from 'react';
import { AsyncStorage, Text, View , Button} from 'react-native';
import { connect } from 'react-redux'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
var jwtDecode = require('jwt-decode');

/*
const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_NAME);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
  };
});
*/

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'home',
  };

  constructor(props) {
    super(props);
    console.log("HomeScreen constructor props",props)


    const httpLink = createHttpLink({
      uri: 'http://10.0.144.167:3000/graphql',
    });
    
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      console.log("authLink set context");
      const token = this.props.auth_token;
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });
    
    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
    this.client = client;
  }
  _handleTest = () =>{
    console.log("handle test");
    this.client.query({
      query: gql`
        query TodoApp {
          todos {
            id
            text
            completed
          }
        }
      `,
    })
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

export default connect(mapStateToProps,{})(HomeScreen)
