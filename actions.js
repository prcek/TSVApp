

const setAuth = (auth_token,auth_user) => ({
    type: 'SET_AUTH',
    auth_token, auth_user
})

const clearAuth = () => ({
    type: 'SET_AUTH_CLEAR'
    
})

const setNewVersion = () => ({
    type: 'SET_NEW_VERSION',
})

const setOffline = () => ({
    type: 'SET_OFFLINE',
})

const setOnline = () => ({
    type: 'SET_ONLINE',
})


export {
    setAuth,
    clearAuth,
    setNewVersion,
    setOffline,
    setOnline
}