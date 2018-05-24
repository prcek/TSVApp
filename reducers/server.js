
const server = (state={new_version:false,offline:false}, action) => {
    switch (action.type) {
      case 'SET_NEW_VERSION':
        return  Object.assign({}, state, {
          new_version: true,
        })
      case 'SET_OFFLINE':
        return  Object.assign({}, state, {
          offline: true,
        })
      case 'SET_ONLINE':
      return  Object.assign({}, state, {
        offline:false,
      })
      default:
        return state
    }
  }
  
  export default server;