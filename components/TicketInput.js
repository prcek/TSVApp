import React from 'react';
import { Text,View,TextInput } from 'react-native';

export default class TicketInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"T"
    }
  }
  //T5MR-MHWQ-9G15
  _process_text = (v) => {
    let new_v = v.toUpperCase();
    if (new_v.length==4 || new_v.length==9) {
      new_v+='-'
    }
    this.setState({value:new_v});
  };

  render() {
    const {value} = this.state;
    return (
      <View>
        <Text>ticket input - {value!=null?'"'+value+'"':"null"}</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        autoCapitalize={"characters"}
        autoCorrect={false}
        onChangeText={this._process_text}
        value={value}/>
      </View>
    );
  }
}
