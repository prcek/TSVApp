import React from 'react';
import { Notifications } from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import { Constants } from 'expo';
import { AsyncStorage, Text, View , Button} from 'react-native';
import { connect } from 'react-redux'
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { setAuth, clearAuth } from './../actions'
import { doRelogin } from './../auth';
var jwtDecode = require('jwt-decode');


import MainTabNavigator from './MainTabNavigator';
//import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

class RootNavigation extends React.Component {

  constructor(props) {
    super(props);
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

  _tick = ()=>{
    //console.log("tick")
    doRelogin().then(res=>{
      console.log("_tick.doRelogin res:",res);
    })
  }

  componentDidMount() {
   // this._notificationSubscription = this._registerForPushNotifications();
    console.log("RootNavigation DidMount");
    this.timer = setInterval(this._tick,5000);
  }

  componentWillUnmount() {
   // this._notificationSubscription && this._notificationSubscription.remove();
   console.log("RootNavigation WillUnmount");
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <AppNavigator />
      </ApolloProvider>
    );
  }
/*
  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
*/
}


function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuth: (token,user) => {
      dispatch(setAuth(token,user))
    },
    onClearAuth: () => {
      dispatch(clearAuth())
    },

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(RootNavigation)
