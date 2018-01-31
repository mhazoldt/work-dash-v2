import React from 'react';


function baselayout(state = [], action) {
    switch (action.type) {
        case 'SET_STATE_BASE': {
            let newState = Object.assign({}, state, action.rState)
            
            return newState
        }
        
        default: {
            return state
        }
    }

}


export default baselayout