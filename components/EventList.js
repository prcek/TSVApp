import React from 'react';
import { Alert,Text, Button, FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { compose, graphql, withApollo} from "react-apollo";
import { setEvent, clearEvent } from '../actions'

import gql from 'graphql-tag';
import Moment from 'moment';

const GQL_GET_EVENTS=gql`
query GetEvents {
  events {
    id
    name
    status
    date
  }
}
`;

class EventListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    const textColor = this.props.selected ? "green" : "white";
    const mm = Moment(this.props.date).toDate();

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{padding:4, flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: textColor}}>
          <Text style={{  fontWeight: 'bold', fontSize:15}}>
            {this.props.title}
          </Text>
          <Text style={{ }}>
            {mm.toLocaleDateString()+" "+mm.toLocaleTimeString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class EventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing:false,
      selected:null,
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

  _onPressItem = (item) => {
    this.props.onEventSelected(item);
  };

  _renderItem = ({item}) => (
    <EventListItem
      id={item.id}
      item={item}
      onPressItem={this._onPressItem}
      selected={this.props.selected_event_id==item.id}
      title={item.name}
      date={item.date}
    />
  );

  render() {
    return (
      <React.Fragment>
        <Button onPress={()=>this.fetchEvents()} title="načíst akce"/>
        <FlatList 
          data={this.state.events}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.refreshing}
          onRefresh={()=>this.fetchEvents()}
          ListEmptyComponent={(<Text> Akce nejsou načteny </Text>)}
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
      selected_event_id: state.event.event_id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEventSelected: (item) => {
      dispatch(setEvent(item.id,item.name,item.date))
    },
  }
}



export default compose(
  withApollo,
  connect(mapStateToProps,mapDispatchToProps),
)(EventList);
