import React from 'react';
import { Text,View,TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
import gql from 'graphql-tag';


const GQL_TICKET_LOOKUP=gql`
query eventTicketLookup($event_id:ID!, $lookup_key:String!) {
  eventTicketLookup(event_id:$event_id lookup_key:$lookup_key) {
    limited
    match {
      ticket_key
    }
    candidates
  }
}
`;




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

class TicketInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"T",
      candidates:[],
      lookup:false
    }
  }
  
  lookup_candidates(v) {

    if (this.state.lookup) {
      return;
    }
    if (!this.props.event_id) {
      return;
    }
    this.setState({lookup:true},()=>{
      this.props.client.query({
        query:GQL_TICKET_LOOKUP,
        variables:{
          event_id:this.props.event_id,
          lookup_key:v,
        },
        fetchPolicy:"network-only"
      }).then(res => {
        //console.log("ticket lookup res",res);
        let candidates = [];
        if (res.data && res.data.eventTicketLookup) {
           candidates = res.data.eventTicketLookup.candidates;
        }
        this.setState({lookup:false,candidates})
      }).catch(err=>{
        console.error("ticket lookup error",err);
        this.setState({lookup:false})
      })

    })
  }

  _process_text = (v) => {
    let new_v = v.toUpperCase();

    if (this.state.value && new_v && new_v.length>this.state.value.length) {
      if (new_v.length==4 || new_v.length==9) {
        new_v+='-'
      }
    } 
    this.setState({value:new_v});
    this.lookup_candidates(new_v);
  };
  _onPressCandidate = ()=>{
    if (this.state.candidates.length==1) {
      this.setState({value:this.state.candidates[0]})
    }
  }
  render() {
    const {value,candidates} = this.state;
    const {event_id} = this.props;
    return (
      <View>
        {candidates.length==1 &&(
           <TouchableOpacity onPress={this._onPressCandidate}>
            <Text>{candidates[0]} ? </Text>
           </TouchableOpacity>
        )}
        <TextInput style={{height: 40, width:250, borderColor: 'gray', borderWidth: 1}}
        autoCapitalize={"characters"}
        autoCorrect={false}
        clearButtonMode={'always'}
        onChangeText={this._process_text}
        value={value}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
      auth_ok: state.auth.ok,
      event_id: state.event.event_id,
  }
}

export default compose(
  withApollo,
  connect(mapStateToProps,{}),
)(TicketInput);
