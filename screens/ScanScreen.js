


import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { withNavigationFocus } from 'react-navigation';

import { compose, graphql, withApollo} from "react-apollo";
import gql from 'graphql-tag';

import { connect } from 'react-redux'


const GQL_CHEKCQR=gql`
query CheckQR($qr:String!) {
  device_CheckQR(qr:$qr) {
    ok
  }
}
`;



const s = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height:70,
    backgroundColor: 'red',
    opacity: 0.4
  }
});


class ScanScreen extends React.Component {
  static navigationOptions = {
    title: 'scan',
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      wait:false,
      msg:"?"
    }
    this.clearTimer = null;
  }

  async componentWillMount() {
    console.log('componentWillMount');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  componentWillUnmount() {
    // this._notificationSubscription && this._notificationSubscription.remove();
    console.log("ScanScreen WillUnmount");
     if (this.clearTimer) { clearTimeout(this.clearTimer); this.timer = null;}
   }

  _startClearTimeout = ()=> {
    if (this.clearTimer) { 
      clearTimeout(this.clearTimer); 
    }
    this.clearTimer = setTimeout(this._handleClear,3000);
  } 
  _handleClear = ()=>{
    if (!this.state.wait) {
      this.setState({msg:""});
    } else {
      this.setState({msg:"timeout"});
    }
  }
  render() {
    const { hasCameraPermission,msg } = this.state;
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
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
            focusDepth={1}
          />
          <View style={s.overlay}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text> {msg} </Text>
              <Button onPress={this._fakeQR} title="QR1"/>
            </View>
          </View>
        </View>
      );
    }
  }
  _fakeQR = () =>{
    this._handleBarCodeRead({type:"qr",data:"xxxx"});
   }

  _handleBarCodeRead = ({ type, data }) => {
     console.log(`Bar code with type ${type} and data ${data} has been scanned!`);

     if (this.state.wait) {
       console.log("ignore")
       return;
     } else {

       this.setState({wait:true,msg:"..."});
     }

     this.props.client.query({
       query:GQL_CHEKCQR,
       variables:{qr:data},
       fetchPolicy:"no-cache"
      })
     .then(res => {
       console.log("checkQR res:",res)
       this.setState({wait:false,msg:"ok"});
       this._startClearTimeout();
     })
     .catch(error => {
      console.log("checkQR error:",error)
      this.setState({wait:false,msg:"error"});
      this._startClearTimeout();
    });
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
  withNavigationFocus,
  connect(mapStateToProps,{}),
)(ScanScreen);
