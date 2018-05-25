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
    console.log("DO_LOGIN");
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
    console.log("DO_RELOGIN");
    return new Promise(function(resolve, reject) {

        const auth = store.getState().auth;
        if (!auth) { 
            resolve({ok:false,err:"no token"})
            return;
        }
        const token = auth.token;
        if (!token) {
            resolve({ok:false,err:"no token"})
            return;
        }
        if (token==="") {
            resolve({ok:false,err:"no token"})
            return;
        }


        const d = jwtDecode(token);
        if (!d) {
            resolve({ok:false,err:"invalid token"})
            return;
        }
        if (!d.exp) {
            resolve({ok:false,err:"invalid token"})
            return;
        }
    
        var now = new Date();
        var exp = (d.exp*1000)-now.getTime();
        if (exp>5000) {
            console.log("login auth exp: ", exp/60000, "min left")
            if (exp<(60000*45)) {  //1 hour before exp
                console.log("doRelogin");
                const url = "http://10.0.144.167:3000/spa_auth/relogin";
                fetch(url,{
                    method:'POST',
                    body:JSON.stringify({token:token}), 
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then((resp) => resp.json()).then(data=>{
                    if (data.auth_ok) {
                        console.log("relogin ok");
                        processAuthResp(data);
                        resolve({ok:true})
                    } else {
                        console.log("relogin no auth")
                        store.dispatch(clearAuth());
                        resolve({ok:false,err:"relogin failed"})
                    }
                }).catch(err=>{
                    console.log("relogin failed");
                    resolve({ok:false,err:"network problem"})
                })
            } else {
                console.log("relogin not needed");
                resolve({ok:true});
            }
        } else {
            store.dispatch(clearAuth());
            resolve({ok:false,err:"token expired"})
        }

    });

}

function doLogout() {

}

function checkAuth() {

}

function ping() {

}
 
module.exports = {
    doLogin:doLogin,
    doRelogin:doRelogin,
    doLogout:doLogout,
    checkAuth:checkAuth,
    ping:ping,
}