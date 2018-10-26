

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

const setEvent = (event_id,event_title,event_date) => ({
    type: 'SET_EVENT',
    event_id,event_title,event_date
})

const clearEvent = () => ({
    type: 'CLEAR_EVENT'  
})


export {
    setAuth,
    clearAuth,
    setNewVersion,
    setOffline,
    setOnline,
    setEvent,
    clearEvent,
}