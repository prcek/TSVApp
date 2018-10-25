import React from 'react';
import { Text,View,TextInput } from 'react-native';

const FAKE_TICKETS = [
  'T5MR-MHWQ-9G15',
  'T5AR-1HWQ-9G15',
  'T5MC-MOWQ-9G15',
  'T5MR-MHWQ-9G15',
  'T5MX-MHWQ-9G15',
  'T5MR-MHMQ-9G15',
  'T5ZR-MHWQ-9G15',
  'T5MB-MHWQ-9G15',
];

export default class TicketInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"T"
    }
  }
  
  lookup_candidates(v) {
    const cands = FAKE_TICKETS.filter(t=>{
      return t.startsWith(v);
    })
    return cands;
  }

  _process_text = (v) => {
    let new_v = v.toUpperCase();
    if (new_v.length==4 || new_v.length==9) {
      new_v+='-'
    }
    this.setState({value:new_v});
  };

  render() {
    const {value} = this.state;
    const candidates = this.lookup_candidates(value);
    return (
      <View>
        <Text>ticket input - {value!=null?'"'+value+'"':"null"}</Text>
        <Text>candidates: {candidates.length==1?candidates[0]:candidates.length}</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        autoCapitalize={"characters"}
        autoCorrect={false}
        onChangeText={this._process_text}
        value={value}/>
      </View>
    );
  }
}
