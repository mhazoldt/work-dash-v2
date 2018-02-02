
function saved(state = [], action) {
    switch (action.type) {
        case 'SET_STATE_SAVED': {
            let newState = Object.assign({}, state, action.rState)
            
            return newState
        }
        
        default: {
            return state
        }
    }

}


export default saved