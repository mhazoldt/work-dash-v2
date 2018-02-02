import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios';
import ResultCard from './ResultCard';
import Search from './Search';
import Saved from './Saved';

import { workSearch, setSearchParameter, setReduxState } from '../redux/search/actionCreators'
import { Tab, Tabs } from "@blueprintjs/core";


class Home extends Component {

    render() {

        return (
            <div>
                {this.props.isAuthenticated &&
                    <div className='container mt-4 pb-4'>
                        <Tabs>
                            <Tab id="rx" title="Search" panel={<Search />} />
                            <Tab id="rxd" title="Saved" panel={<Saved />} />

                        </Tabs>
                    </div>
                }
                {!this.props.isAuthenticated &&
                    <div className='container mt-4 pb-4'>
                            <Search />
                    
                    </div>
                }

            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        cardJsx: appState.search.cardJsx,
        searchResults: appState.search.searchResults,
        distance: appState.search.distance,
        location: appState.search.location,
        searchText: appState.search.searchText,
        isFetching: appState.search.isFetching,
        cardCollapse: appState.search.cardCollapse,
        isAuthenticated: appState.baselayout.isAuthenticated

    }
}



export default withRouter(connect(mapStateToProps)(Home))