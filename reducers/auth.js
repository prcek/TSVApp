
const auth = (state={token:null,user:null,ok:false,last_login:null}, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        console.log("SET_AUTH",action)
        return  Object.assign({}, state, {
          token: action.auth_token,
          user: action.auth_user,
          ok:true,
          last_login: action.auth_user.login,
        })
        case 'SET_AUTH_CLEAR':
        return  Object.assign({}, state, {
          user: null,
          token: null,
          ok:false
        })
        default:
        return state
    }
  }
  
  export default auth;