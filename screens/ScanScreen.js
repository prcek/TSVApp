


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { withNavigationFocus } from 'react-navigation';

class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'scan',
  };

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    console.log('componentWillMount');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { hasCameraPermission } = this.state;
   // console.log(this.props);
    const isFocused = this.props.isFocused;
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (!isFocused) {
      console.log("scan inactive");
      return <Text>Inactive</Text>;
    } else {
      console.log("scan active");
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>scan!</Text>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
     console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}


export default withNavigationFocus(ScanScreen);