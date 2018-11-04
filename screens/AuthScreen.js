
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

    constructor(props) {
      super(props);
      this.state = {
        login: props.last_login?props.last_login:null,
        password: null,
        wait:false,
        auth_res:""
      };
      
      this.pass_field = React.createRef();
    }
  

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
          this.setState({password:""});
          this._handleFocusPass();
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

    _handleFocusPass = () => {
      //console.log("_handleFocusPass")
      if (this.pass_field.current) {
        //console.log("ooooo")
        this.pass_field.current.focus();
      }
    }
 
    render() {
      const { login, password, wait, auth_res} = this.state;
      const { auth_token, auth_ok , auth_user} = this.props;
      return (
        <View style={Styles.screen_view}>
          {auth_ok?(
            <React.Fragment>
                <Text style={Styles.text_ok}>Uživatel {auth_user.name} je přihlášen(a)</Text>
                <Button
                  style={Styles.button}
                  disabled={ wait }
                  onPress={this._handleLogout}
                  title="Odhlásit"
                  //color="#841584"
                />
            </React.Fragment>
          ):(
            <React.Fragment>
              <Text style={Styles.text_ko}>Aktuálně NEJSTE přihlášen(a)</Text>
              <TextInput autoFocus returnKeyType = { "next" } placeholder={"přihlašovací jméno"} maxLength={100} autoCapitalize={"none"} autoCorrect={false} style={Styles.input} onSubmitEditing={this._handleFocusPass} value={login} onChangeText={this._handleChangeLogin}/> 
              <TextInput ref={this.pass_field} placeholder={"heslo"} maxLength={100} autoCapitalize={"none"} autoCorrect={false} secureTextEntry style={Styles.input} value={password} onSubmitEditing={this._handleLogin} onChangeText={this._handleChangePassword}/>
                <Button
                  style={Styles.button}
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
      last_login:state.auth.last_login,
  }
}


export default connect(mapStateToProps,{})(AuthScreen)