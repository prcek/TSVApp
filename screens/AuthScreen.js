
import React from 'react';
import { Constants } from 'expo';
import { Platform,StyleSheet, Text, View , TextInput, Button} from 'react-native';
import { connect } from 'react-redux'
import { doLogin,doLogout} from './../auth';

import Styles from '../constants/Styles';

/*

const styles = StyleSheet.create({
  text_ok: {
    fontWeight: 'bold',
    color:"green",
    fontSize: 25,
  },
  text_ko: {
    fontWeight: 'bold',
    color:"red",
    fontSize: 25,
  },
  
  input: Platform.OS === 'ios' ? {
    //margin:16,
    //fontWeight: 'bold',
    fontSize: 25,
    borderColor: 'gray', 
    borderWidth: 1
  }:{
    //fontWeight: 'bold',
    fontSize: 25,
  },
});
*/

class AuthScreen extends React.Component {

    static navigationOptions = {
      title: 'Přihlášení',
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
          alert("přihlášení se nepodařilo");
          //alert(res.err);
        }
      });
      
    }

    _handleLogout = () =>{
      this.setState({wait:true,auth_res:"wait...."});
      doLogout().then(res=>{
          this.setState({wait:false,auth_res:"logout"});
      });
      
    }

 
    render() {
      const { login, password, wait, auth_res} = this.state;
      const { auth_token, auth_ok , auth_user} = this.props;
      return (
        <View style={{ padding: 16, flex: 1, flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'stretch' }}>
          {auth_ok?(
            <React.Fragment>
                <Text style={Styles.text_ok}>Uživatel {auth_user.name} je přihlášen(a)</Text>
                <Button
                  disabled={ wait }
                  onPress={this._handleLogout}
                  title="Odhlásit"
                  //color="#841584"
                />
            </React.Fragment>
          ):(
            <React.Fragment>
              <Text style={Styles.text_ko}>Aktuálně NEJSTE přihlášen(a)</Text>
              <TextInput autoCapitalize={"none"} autoCorrect={false} style={Styles.input} value={login} onChangeText={this._handleChangeLogin}/> 
              <TextInput autoCapitalize={"none"} autoCorrect={false} secureTextEntry style={Styles.input} value={password} onChangeText={this._handleChangePassword}/>
                <Button
                  disabled={ wait || !login || !password}
                  onPress={this._handleLogin}
                  title="přihlásit"
                  //color="#841584"
                />
            </React.Fragment>
          )}

          {Platform.OS === 'ios' && (
            <React.Fragment>
              <Text>ID zařízení: {Constants.deviceId}</Text>
              <Text>auth res - {auth_res}</Text>
              <Text>auth token - {auth_token} </Text>
            </React.Fragment>
          )}
       

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