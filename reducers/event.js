
const event = (state={event_id:null,event_title:null,event_date:null}, action) => {
    switch (action.type) {
      case 'SET_EVENT':
        console.log("SET_AUTH",action)
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
        default:
        return state
    }
  }
  
  export default event;