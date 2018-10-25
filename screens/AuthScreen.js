
import React from 'react';
import { Constants } from 'expo';
import { Text, View , TextInput, Button} from 'react-native';
import { connect } from 'react-redux'
import { doLogin} from './../auth';

class AuthScreen extends React.Component {

    static navigationOptions = {
      title: 'login',
    };

    state = {
      login: null,
      password: null,
      wait:false,
      auth_res:""
    };

    _handleChangeLogin = (v) => {
      this.setState({login:v});
    }

    _handleChangePassword = (v) => {
      this.setState({password:v});
    }
    _handleLogin = () =>{
      this.setState({wait:true,auth_res:"wait...."});
      doLogin(this.state.login,this.state.password).then(res=>{
        if (res.ok) {
          this.setState({wait:false,auth_res:"ok"});
        } else {
          this.setState({wait:false,auth_res:"failed"});
          alert(res.err);
        }
      });
      
    }
 
    render() {
      const { login, password, wait, auth_res } = this.state;
      const { auth_token, auth_ok } = this.props;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>ID zařízení: {Constants.deviceId}</Text>
          <Text>Aktuálně {auth_ok?"JSTE": "NEJSTE"} přihlášen</Text>
          <TextInput autoCapitalize={"none"} autoCorrect={false} style={{height: 40, width:300, borderColor: 'gray', borderWidth: 1}} value={login} onChangeText={this._handleChangeLogin}/> 
          <TextInput autoCapitalize={"none"} autoCorrect={false} secureTextEntry style={{height: 40, width:300, borderColor: 'gray', borderWidth: 1}} value={password} onChangeText={this._handleChangePassword}/>
          <Button
            disabled={ wait || !login || !password}
            onPress={this._handleLogin}
            title="login"
            //color="#841584"
          />
          <Text>auth res - {auth_res}</Text>
          <Text>auth token - {auth_token} </Text>

        </View>
      );
    }

}

function mapStateToProps(state) {
  return { 
      auth_token: state.auth.token,
      auth_user: state.auth.user,
      auth_ok:state.auth.ok,
  }
}


export default connect(mapStateToProps,{})(AuthScreen)