import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../constants/Styles';

class NoAuthWarn extends React.Component {
  
  render() {
    if (this.props.auth_ok) {
      return null;
    }
    return <Text style={Styles.text_ko}>Nejste přihlášen(a)!</Text>;
  }
}


function mapStateToProps(state) {
  return { 
      auth_ok:state.auth.ok,
  }
}


export default connect(mapStateToProps,{})(NoAuthWarn)