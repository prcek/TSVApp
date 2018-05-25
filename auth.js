import { setAuth, clearAuth } from './actions'
import {store} from './store';
import { Constants } from 'expo';

const jwtDecode = require('jwt-decode');

function processAuthResp(data) {
    const dt = jwtDecode(data.auth_token);
    console.log("DT:",dt)
    store.dispatch(
        setAuth(data.auth_token,{role:dt.role,login:data.login, id:dt.user_id,name:data.name,cgroup_key:data.cgroup_key})
    );
}


function doLogin(user,password) {
    return new Promise(function(resolve, reject) {
        const url = "http://10.0.144.167:3000/spa_auth/login";
        fetch(url,{
            method:'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: user,
              password: password,
              device_id: Constants.deviceId
            }),
        }).then((resp) => resp.json()).then(res=>{
            console.log("FETCH res",res);
            if (res.auth_ok) {
              processAuthResp(res);
              resolve({ok:true});
            } else {
              store.dispatch(clearAuth());
              resolve({ok:false,err:"wrong password or username"});
            }
          }).catch(err=>{
            console.log("FETCH err",err);
            resolve({ok:false,err:"network error"});
          })

    });
}

function doRelogin() {

}

function doLogout() {

}

function checkAuth() {

}

module.exports = {
    doLogin:doLogin,
    doRelogin:doRelogin,
    doLogout:doLogout,
    checkAuth:checkAuth,
}