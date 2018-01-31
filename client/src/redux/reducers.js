import { combineReducers } from 'redux'

import search from './search/reducers'
import baselayout from './baselayout/reducers'


let reducers = combineReducers({
    search,
    baselayout
})

export default reducers