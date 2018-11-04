import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux'
import Styles from '../constants/Styles';

class CurrentEvent extends React.Component {
  
  render() {
    const {event_id,event_title}  = this.props;
    if (event_id) {
      return <Text style={Styles.text_ok}>{event_title}</Text>;
    } else {
      return <Text style={Styles.text_ko}>Není zvolena akce</Text>;
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