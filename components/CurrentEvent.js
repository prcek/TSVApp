import React from 'react';
import { Text,View } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../constants/Styles';




class CurrentEvent extends React.Component {
  
  render() {
    const {event_id,event_title}  = this.props;
    if (event_id) {
      return (
        <View style={Styles.event_header}>
           <Text style={Styles.event_header_text}>Akce: {event_title}</Text>
        </View>
      );
    } else {
      return (
        <View style={Styles.event_header}>
          <Text style={Styles.text_ko}>Není zvolena akce!</Text>
        </View>
      );
    }
   
  }
}


function mapStateToProps(state) {
  return { 
      event_title:state.event.event_title,
      event_id:state.event.event_id,
  }
}


export default connect(mapStateToProps,{})(CurrentEvent)