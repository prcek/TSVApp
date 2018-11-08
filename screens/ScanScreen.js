


import React from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity, Image} from 'react-native';
import { withNavigationFocus, withNavigation, NavigationEvents } from 'react-navigation';
import { compose, } from "react-apollo";
import NavContext from '../navigation/NavContext';
import { connect } from 'react-redux'
import Scanner from '../components/Scanner';
import Styles from '../constants/Styles';
import NoAuthWarn from '../components/NoAuthWarn';
import CurrentEvent from '../components/CurrentEvent';






class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'scan',
  };

  

  constructor(props) {
    super(props);
  }

  _handleTicket = (t) => {
    //this.props.navigation.navigate('Ticket',{ticket_key:t});
  }

  
  render() {
    return (
      <View style={Styles.screen_view}>
        <NoAuthWarn />
        <CurrentEvent />
        <NavContext.Consumer>
          {value =>{
            return (
              <Scanner route={value} onTicket={this._handleTicket} />
            )
          }}
        </NavContext.Consumer>
      </View>
    )
  }


}

function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
      auth_ok: state.auth.ok,
  }
}


export default compose(
  withNavigation,
  connect(mapStateToProps,{}),
)(ScanScreen);
