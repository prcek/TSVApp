


import React from 'react';
import { StyleSheet, Text, View , Button, TouchableOpacity, Image} from 'react-native';
import { BarCodeScanner, Permissions ,Camera,FileSystem, takeSnapshotAsync} from 'expo';
import { withNavigationFocus, withNavigation, NavigationEvents } from 'react-navigation';

import { compose, graphql, withApollo} from "react-apollo";
import gql from 'graphql-tag';
import NavContext from '../navigation/NavContext';
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
    height:170,
    backgroundColor: 'transparent',
    //opacity: 0.4
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
      msg:"?",
      type:Camera.Constants.Type.back,
      shot:null,
    }

    this.camera = null;
    this.tickTimer = null;
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(res=>{
      const { status } = res;
      console.log("hasCameraPermission",res)
      this.setState({hasCameraPermission: status === 'granted'});
    })
    this.tickTimer = setInterval(this._tick,2000);
  }

  componentWillUnmount() {
    console.log("ScanScreen WillUnmount");
     if (this.tickTimer) { clearInterval(this.tickTimer); this.tickTimer = null;}
  }

  _tick = ()=> {
     if (this.props.isFocused) {
      console.log("scan");
     }
    
  }

  
  render() {
    const { hasCameraPermission,msg } = this.state;
   // console.log(this.props);
    const {isFocused,navigation} = this.props;
   // const isFocused = navigation.isFocused();


    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (!isFocused) {
      console.log("scan inactive");
      return (
        <View>
        <Text>Inactive - {JSON.stringify(navigation.state)}</Text>
        <Button title="XX" onPress={()=>this.props.navigation.dismiss()}> </Button>
        <NavContext.Consumer>
          {value => {
              console.log("NavContext.Consumer",value)
             return (<Text>{JSON.stringify(value)}</Text>)
            }}
        </NavContext.Consumer>
        </View>
      );
    } else if (true) {
      console.log("scan active");
      return (<Text>Active - {JSON.stringify(navigation.state)}</Text>);
    } else {
      console.log("scan active");
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ref={ref => { this.view = ref; }}>
          <Camera ref={ref => { this.camera = ref; }}
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
            focusDepth={1}
            type={this.state.type}
          >
           
           <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 20, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 20, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

            </View>


          </Camera>
          <View style={s.overlay}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ backgroundColor:"red"}}> {msg} </Text>
              <Button onPress={this._fakeQR} title="QR1"/>
              { this.state.shot && (
                  <Image source={{ uri:this.state.shot.uri}}   style={{ width: 100, height: 100, resizeMode: 'contain' }} />
              )}
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
       if (this.camera) {
        //takeSnapshotAsync(this.view,{format:'png',quality:1,result:'data-uri',height:100,width:100}).then((shot)=>{
         this.camera.takePictureAsync({quality:0,exif:false,width:100}).then((shot)=>{
           console.log("takeSnapshotAsync",shot);
           this.setState({shot:shot});
         })
       }
     }

     this.props.client.query({
       query:GQL_CHEKCQR,
       variables:{qr:data},
       fetchPolicy:"no-cache"
      })
     .then(res => {
       console.log("checkQR res:",res)
       this.setState({msg:"ok"});
       this._startClearTimeout();
     })
     .catch(error => {
      console.log("checkQR error:",error)
      this.setState({msg:"error"});
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
  withNavigation,
  connect(mapStateToProps,{}),
)(ScanScreen);
