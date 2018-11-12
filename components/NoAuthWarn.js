import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../constants/Styles';
import Button from '../components/Button';


import { compose } from "react-apollo";
import { withNavigation } from 'react-navigation';

class NoAuthWarn extends React.Component {
  
  _toAuth = ()=>{
    this.props.navigation.navigate('Auth');
  };

  render() {
    if (this.props.auth_ok) {
      return null;
    }
    return (
      <React.Fragment>
        <Text style={Styles.text_ko}>Nejste přihlášen(a)!!</Text>
        <Button
          onPress={this._toAuth}
          title={"přihlásit"}
        />
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return { 
      auth_ok:state.auth.ok,
  }
}



export default compose(
  withNavigation,
  connect(mapStateToProps,{}),
)(NoAuthWarn);
