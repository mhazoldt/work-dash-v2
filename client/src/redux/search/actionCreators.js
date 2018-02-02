let axios = require('axios')

function isFetchingJobSearch() {
    return { type: 'STARTING_FETCH_JOB_SEARCH' }
}

function fetchingJobSearchComplete(response) {
    return { type: 'FETCH_JOB_SEARCH_COMPLETE', response: response }
}

function setSearchParameter(param, value) {
    
    return { type: 'SET_SEARCH_PARAMETER', [`${param}`]: value }
}

function setReduxState(rState) {
    
    return { type: 'SET_STATE', rState: rState }
}




// thunks


function workSearch(query, location, distance) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(isFetchingJobSearch())


        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.



        axios.get('/api/search', {
            params: {
                q: query,
                l: location,
                m: 'miles',
                d: distance
            }
        })
        .then(function (response) {
            console.log('got response')
            console.log(response)
            dispatch(fetchingJobSearchComplete(response))

        })
        .catch(function (error) {
            console.log(error);
        });

    }
}


module.exports = {
    setSearchParameter,
    setReduxState,
    workSearch
}