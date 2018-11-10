import React from 'react';
import { Text,View,TextInput,TouchableOpacity,Button } from 'react-native';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
import gql from 'graphql-tag';
import Styles from '../constants/Styles';
import { Ionicons } from '@expo/vector-icons';

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



class TicketInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"T",
      candidates:[],
      lookup:false,
      valid_value:false,
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
           console.log("CANDIDATES",res.data.eventTicketLookup);
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


    this.setState({value:new_v,valid_value:(new_v.length==14)});
    if (this.props.auth_ok) {
      this.lookup_candidates(new_v);
    }
  };
  _onPressCandidate = ()=>{
    if (this.state.candidates.length==1) {
     // this.setState({value:this.state.candidates[0],valid_value:true})
      const val = this.state.candidates[0];
      this._onClear();
      this.props.onTicket(val);
    }
  }
  _onHandleTicket = ()=>{
    const val = this.state.value;
    this._onClear();
    this.props.onTicket(val);
  }

  _onClear = ()=>{
    this.setState({value:"T",valid_value:false,candidates:[]})
  }

  render() {
    const {value,candidates,valid_value} = this.state;
    const {event_id} = this.props;
    return (
      <React.Fragment>
        <View style={{flex: 0, flexDirection: 'row', alignItems:"center"}}>
          <TextInput style={Styles.input2}
          placeholder={"kód vstupenky"}
          autoCapitalize={"characters"}
          autoCorrect={false}
          autoFocus
          clearButtonMode={'always'}
          onChangeText={this._process_text}
          onSubmitEditing={this._onHandleTicket}
          value={value}/>
          <TouchableOpacity style={{
              //backgroundColor: "#007aff",
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 10
          }} onPress={this._onClear}>
         

          <Ionicons
            name={"md-backspace"}
            size={35}
            //style={{ marginBottom: -3 }}
            //color='#fff'
          />
          </TouchableOpacity>
  
        </View>

        {candidates.length==1 &&(
          <Button
            style={Styles.button}
            onPress={this._onPressCandidate}
            title={candidates[0]}
          />
       )}
       {valid_value && candidates.length!=1 && (
          <Button
          style={Styles.button}
          onPress={this._onHandleTicket}
          title={"hledat vstupenku"}
        />
       )}
      </React.Fragment>
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
