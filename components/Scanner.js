import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../constants/Styles';
import { BarCodeScanner, Permissions ,Camera} from 'expo';


class Scanner extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    }
    this.tickTimer=null;
  }

  _tick = ()=>{
    console.log("Scanner TICK",this.props);
  }
  componentDidMount() {
    console.log("Scanner componentDidMount");
    Permissions.askAsync(Permissions.CAMERA).then(res=>{
      const { status } = res;
      console.log("hasCameraPermission",res)
      this.setState({hasCameraPermission: status === 'granted'});
    })
    this.tickTimer = setInterval(this._tick,2000);
  }
  componentWillUnmount() {
    console.log("Scanner componentWillUnmount");
    if (this.tickTimer) { clearInterval(this.tickTimer); this.tickTimer = null;}
  }

  _handleBarCodeRead = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (this.props.route == "Main/ScanStack/Scan/") {
      this.props.onTicket(data);
    }
  };

  render() {
      return (
        <Camera //ref={ref => { this.camera = ref; }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
        }}
        onBarCodeScanned={this._handleBarCodeRead}
        style={StyleSheet.absoluteFill}
        focusDepth={1}
        //type={this.state.type}
        />
      )
  }
}


function mapStateToProps(state) {
  return { 
      event_title:state.event.event_title,
      event_id:state.event.event_id,
  }
}


export default connect(mapStateToProps,{})(Scanner)