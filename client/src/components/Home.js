import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios';
import ResultCard from './ResultCard';

import { workSearch, setSearchParameter, setReduxState } from '../redux/search/actionCreators'
import { Popover, RadioGroup, Radio } from "@blueprintjs/core";


class Home extends Component {

    submitSearch = () => {

        this.props.dispatch(workSearch(this.props.searchText, this.props.location, this.props.distance))

    }

    submitSearchOnEnter = (e) => {

        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            this.props.dispatch(workSearch(this.props.searchText, this.props.location, this.props.distance))
        }

    }

    displayResults = (results) => {
        let data = JSON.parse(results.data)
        let searchResults = data['rss']['channel'][0]['item']
        let numberOfResults = data['rss']['channel'][0]['os:totalResults']
        console.log(data['rss']['channel'][0]['item'])
        console.log('location')
        // console.log(data['rss']['channel'][0]['item'][0].location[0]['_'])
        console.log(data['rss']['channel'][0]['os:totalResults'])

        if(searchResults) {
            let cardCollapse = searchResults.reduce((total, result) => {
                let guid = result.guid[0]['_']
                total[guid] = true
                return total
    
            }, {})
    
            this.props.dispatch(setReduxState({ cardCollapse: cardCollapse }))
    
            let cardData = searchResults.map((result) => {
                return (<ResultCard data={result} />)
            })
    
            this.props.dispatch(setReduxState({ cardJsx: cardData }))

        }

    }



    handleChange = (e) => {
        console.log("<SearchPage> - handleChange()")
        console.log(e.target.value)

        this.props.dispatch(setReduxState({ [e.target.name]: e.target.value }))

    }


    componentWillReceiveProps(nextProps) {


        if (this.props.searchResults !== nextProps.searchResults) {
            console.log('BEFORE DISPLAYRESULTS')
            this.displayResults(nextProps.searchResults)


        }


    }




    render() {

        return (
            <div className='container mt-4 pb-4'>
                <div className="pt-card pt-elevation-2">

                    <div className='row'>


                        <div className='col'>

                            <div className="pt-control-group" style={{ width: '100%' }}>
                                <div class="pt-input-group pt-large" style={{ width: '100%' }}>

                                    <span className="pt-icon pt-icon-desktop"></span>
                                    <input className="pt-input pt-large" style={{ width: '100%', borderRadius: '3px' }} type="text" onChange={this.handleChange} onKeyPress={this.submitSearchOnEnter} placeholder="Job Search" name="searchText" dir="auto" />

                                </div>
                            </div>

                        </div>


                        <div className='col'>

                            <div className="pt-control-group" style={{ width: '100%' }}>
                                <div className="pt-input-group pt-large" style={{ width: '100%' }}>

                                    <span className="pt-icon pt-icon-map-marker"></span>
                                    <input className="pt-input pt-large" style={{ width: '100%', borderRadius: '3px' }} type="text" onChange={this.handleChange} onKeyPress={this.submitSearchOnEnter} placeholder="Location" name="location" dir="auto" />

                                    <div className="pt-input-action">
                                        <Popover popoverClassName="pt-minimal">
                                            <button className="pt-button pt-minimal pt-intent-primary">
                                                Distance<span className="pt-icon-standard pt-icon-caret-down pt-align-right"></span>
                                            </button>
                                            <div style={{ padding: '15px' }}>
                                                <RadioGroup
                                                    onChange={this.handleChange}
                                                    selectedValue={this.props.distance}
                                                    name="distance"
                                                >
                                                    <Radio label="20 miles" value="20" />
                                                    <Radio label="50 miles" value="50" />
                                                    <Radio label="100 miles" value="100" />
                                                </RadioGroup>
                                            </div>
                                        </Popover>
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>



                    {/* <div className='row mt-2'>

                        <div className='col-6'>

                            <div className="pt-control-group" style={{ width: '100%' }}>
                                <div class="pt-input-group pt-large" style={{ width: '100%' }}>

                                    <span className="pt-icon pt-icon-tag"></span>
                                    <input className="pt-input pt-large" style={{ width: '100%', borderRadius: '3px' }} type="text" onChange={this.handleChange} placeholder="Tags" name="tags" dir="auto" />

                                </div>
                            </div>

                        </div>

                    </div> */}

                    <div className='row mt-2'>

                        <div className='col-3'>


                            {!this.props.isFetching &&
                                <button type="button" class="pt-button pt-icon-search pt-large pt-intent-primary" onClick={this.submitSearch}>Search</button>

                            }

                            {this.props.isFetching &&
                                <button type="button" class="pt-button pt-icon-search pt-large pt-intent-primary" disabled>Search</button>

                            }


                        </div>

                    </div>


                </div>

                {this.props.isFetching &&
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '40px' }}>
                        <div class="pt-spinner pt-large">
                            <div class="pt-spinner-svg-container">
                                <svg viewBox="0 0 100 100">
                                    <path class="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
                                    <path class="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                }
                {!this.props.isFetching &&
                    this.props.cardJsx

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
        cardCollapse: appState.search.cardCollapse

    }
}



export default withRouter(connect(mapStateToProps)(Home))