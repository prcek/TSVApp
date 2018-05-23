
import React from 'react';
import { Text, View , TextInput, Button} from 'react-native';

export default class AuthScreen extends React.Component {

    static navigationOptions = {
      title: 'login',
    };

    state = {
      login: null,
      password: null,
      wait:false
    };

    _handleChangeLogin = (v) => {
      this.setState({login:v});
    }

    _handleChangePassword = (v) => {
      this.setState({password:v});
    }
    _handleLogin = () =>{
      alert("xx");
    }
 
    render() {
      const { login, password, wait } = this.state;
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
        </View>
      );
    }

}

