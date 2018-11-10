import React from 'react';
import { Button,View } from 'react-native';
import Styles from '../constants/Styles';

class MyButton extends React.Component {
  render() {
    return (
      <View style={Styles.button_view}>
       <Button {...this.props}/>
      </View>
    );
  }
}


export default MyButton;