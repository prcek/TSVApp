
const event = (state={event_id:null,event_title:null,event_date:null,ticket_key:null}, action) => {
    switch (action.type) {
      case 'SET_EVENT':
        console.log("SET_EVENT",action)
        return  Object.assign({}, state, {
          event_id: action.event_id,
          event_title: action.event_title,
          event_date: action.event_date,
        })
        case 'CLEAR_EVENT':
        return  Object.assign({}, state, {
          event_id: null,
          event_title: null,
          event_date: null,
        })
        case 'SET_TICKET': 
        return  Object.assign({}, state, {
          ticket_key: action.ticket_key,
        })
        case 'CLEAR_TICKET': 
        return  Object.assign({}, state, {
          ticket_key: null,
        })
        default:
        return state
    }
  }
  
  export default event;