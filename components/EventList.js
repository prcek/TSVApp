import React from 'react';
import { Alert,Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
import gql from 'graphql-tag';

const GQL_GET_EVENTS=gql`
query GetEvents {
  events {
    id
    name
    status
  }
}
`;


class EventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing:false,
      events: [
      ]
    }
  }
  
  componentDidMount() {
    console.log("EventList.DidMount");
    //this.fetchEvents();
   }

  fetchEvents() {
    console.log("EventList.fetchEvents");
    this.setState({refreshing:true},()=>{
      console.log("EventList.fetchEvents - fire query")
      this.props.client.query({query:GQL_GET_EVENTS,fetchPolicy:"network-only"})
      .then(res => {
        //console.log(res);
        console.log("EventList.fetchEvents - query done")
        if (res.data && res.data.events) {
          this.setState({events:res.data.events});
          console.log("EventList.fetchEvents - query done new events",res.data.events)
        } else {
          this.setState({events:[]});
        }
        this.setState({refreshing:false});
      })
      .catch(error => {
        console.log(error)
        this.setState({refreshing:false})
        Alert.alert('nepodařilo se načíst seznam akcí ze serveru');
      });
    })
  }

  _keyExtractor = (item, index) => item.id;


  render() {
    return (
      <React.Fragment>
        <Text>Seznam akci {this.state.refreshing?"prenacitase":""}</Text>
        <Button onPress={()=>this.fetchEvents()} title="prenacist seznam akci"/>
        <FlatList 
          data={this.state.events}
          renderItem={({item}) => <Text >{item.name}</Text>}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={()=>this.fetchEvents()}
        />
      </React.Fragment>
      
    );
  }
}


function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
      auth_ok: state.auth.ok,
  }
}


export default compose(
  withApollo,
  connect(mapStateToProps,{}),
)(EventList);
