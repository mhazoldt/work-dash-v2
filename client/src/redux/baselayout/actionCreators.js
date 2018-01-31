function setReduxStateBase(rState) {
    
    return { type: 'SET_STATE_BASE', rState: rState }
}

module.exports = {
    setReduxStateBase
}