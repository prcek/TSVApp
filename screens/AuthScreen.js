
import React from 'react';
import { Text, View , TextInput, Button} from 'react-native';

export default class AuthScreen extends React.Component {

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
      const url = "http://10.0.144.167:3000/spa_auth/login";
      console.log("FETCH");
      fetch(url,{
        method:'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.state.login,
          password: this.state.password,
        }),
      }).then((resp) => resp.json()).then(res=>{
        console.log("FETCH res",res);
        this.setState({wait:false,auth_res:res.auth_ok?"ok":"no"});
      }).catch(err=>{
        console.log("FETCH err",err);
        alert("auth error"+err);
        this.setState({wait:false,auth_res:"error"});
      })

     
    }
 
    render() {
      const { login, password, wait, auth_res } = this.state;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>auth - {login}:{password}</Text>
          <TextInput style={{height: 40, width:300, borderColor: 'gray', borderWidth: 1}} value={login} onChangeText={this._handleChangeLogin}/> 
          <TextInput secureTextEntry style={{height: 40, width:300, borderColor: 'gray', borderWidth: 1}} value={password} onChangeText={this._handleChangePassword}/>
          <Button
            disabled={ wait || !login || !password}
            onPress={this._handleLogin}
            title="login"
            //color="#841584"
          />
          <Text>auth res - {auth_res}</Text>
        </View>
      );
    }

}

