import React from 'react';


function baselayout(state = [], action) {
    switch (action.type) {
        case 'STARTING_FETCH_JOB_SEARCH': {
            let newState = Object.assign({}, state, {
                isFetching: true

            })
            
            return newState
        }
        case 'FETCH_JOB_SEARCH_COMPLETE': {
            let newState = Object.assign({}, state, {
                isFetching: false,
                searchResults: action.response

            })
            
            return newState
        }
        case 'SET_SEARCH_PARAMETER': {
            let newState = Object.assign({}, state, {
                [`${action.param}`]: action.value

            })
            
            return newState
        }
        
        default: {
            return state
        }
    }

}


export default baselayout