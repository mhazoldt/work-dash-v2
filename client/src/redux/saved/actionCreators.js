function setReduxStateSaved(rState) {
    
    return { type: 'SET_STATE_SAVED', rState: rState }
}

module.exports = {
    setReduxStateSaved
}