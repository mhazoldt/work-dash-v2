import { combineReducers } from 'redux'

import search from './search/reducers'
import baselayout from './baselayout/reducers'
import saved from './saved/reducers'


let reducers = combineReducers({
    search,
    baselayout,
    saved
})

export default reducers