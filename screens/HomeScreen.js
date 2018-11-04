


import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import { compose } from "react-apollo";
import EventList from '../components/EventList';
import NoAuthWarn from '../components/NoAuthWarn';
import CurrentEvent from '../components/CurrentEvent';
import Styles from '../constants/Styles';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Výběr akce pro kontrolu',
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {auth_ok} = this.props;
   
    return (
      <View style={Styles.screen_view}>
        <NoAuthWarn />
        <CurrentEvent />
        {auth_ok && (
           <EventList />
        )}
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
  connect(mapStateToProps,{}),
)(HomeScreen);
