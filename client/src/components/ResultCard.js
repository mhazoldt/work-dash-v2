import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios';

import { setReduxState } from '../redux/search/actionCreators'
import { setReduxStateSaved } from '../redux/saved/actionCreators'


class ResultCard extends Component {

    saveJobPost = (e) => {

        let that = this

        let guid = e.currentTarget.dataset.cardId
        let jobPost = this.props.cardJson[guid]

        jobPost.applied = false
        jobPost.response = false
        jobPost.interviewed = false
        jobPost.notes = ''


        axios.defaults.headers.common['Authorization'] = `JWT ${this.props.token}`;

        axios.post('/api/savejob', {
            jobPost: jobPost
        })
            .then(function (response) {
                
                console.log('--got response--')
                console.log(response)
                that.props.dispatch(setReduxStateSaved({ needsUpdate: true }))

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    removeJobPost = (e) => {

        let that = this

        let guid = e.currentTarget.dataset.cardId

        axios.defaults.headers.common['Authorization'] = `JWT ${this.props.token}`;

        axios.post('/api/removejobpost', {
            guid: guid
        })
            .then(function (response) {

                console.log('--got response--')
                console.log(response)
                that.props.dispatch(setReduxStateSaved({ needsUpdate: true }))

            })
            .catch(function (error) {
                console.log(error);
            });

    }



    cardCollapse = (e) => {

        let guid = e.currentTarget.dataset.cardId

        let cardState = Object.assign({}, this.props.cardCollapse, {
            [guid]: !this.props.cardCollapse[guid]

        })


        this.props.dispatch(setReduxState({ cardCollapse: cardState }))

    }

    isJobPostSaved = (savedCardJson, guid) => {
        let jobPostSaved = false

        savedCardJson.forEach((savedJobPost) => {
            if(savedJobPost.guid === guid) {
                jobPostSaved = true
            }
        })

        return jobPostSaved
    }


    render() {
        console.log(this.props.data)
        if (this.props.data.location) {
            let location = this.props.data.location
        }

        let updated = this.props.data.updated
        let author = this.props.data.author
        let category = this.props.data.category
        let description = this.props.data.description
        let guid = this.props.data.guid
        let title = this.props.data.title
        let postDate = this.props.data.postDate
        let tags

        if (this.props.data.category) {
            tags = category.map((t) => {
                return (<span class="pt-tag pt-large pt-intent-primary mr-2">{t}</span>)
            })
        }

        let collapse = this.props.cardCollapse[guid]

        let jobPostSaved = this.isJobPostSaved(this.props.savedCardJson, guid)


        let flexStyle = { display: 'flex', justifyContent: 'space-between', width: '100%' }

        let saveOrRemoveButton

        if(jobPostSaved) {
            saveOrRemoveButton = (<button className='pt-button pt-icon-remove' onClick={this.removeJobPost} data-card-id={guid}>Remove</button>)
        } else {
            saveOrRemoveButton = (<button className='pt-button pt-icon-add pt-intent-success' onClick={this.saveJobPost} data-card-id={guid}>Save</button>)
        }

        return (
            <div className="pt-card pt-elevation-2 mt-4 hoverable animated bounceInUp">



                <div style={flexStyle}>
                    <h5 style={{ display: 'inline-block' }}>#{guid}: {title}</h5>

                    <div>{postDate}</div>
                </div>

                {collapse &&


                    <div class="pt-tree pt-elevation-0 mb-3">
                        <ul class="pt-tree-node-list pt-tree-root">
                            <li class="pt-tree-node pt-tree-node-expanded">
                                <div class="pt-tree-node-content" onClick={this.cardCollapse} data-card-id={guid}>
                                    <span class="pt-tree-node-caret pt-tree-node-caret-closed pt-icon-standard"></span>

                                    <span class="pt-tree-node-label">Description</span>
                                </div>
                            </li>
                        </ul>
                    </div>


                }
                {!collapse &&

                    <div class="pt-tree pt-elevation-0 mb-3">
                        <ul class="pt-tree-node-list pt-tree-root">
                            <li class="pt-tree-node pt-tree-node-expanded">
                                <div class="pt-tree-node-content" onClick={this.cardCollapse} data-card-id={guid}>
                                    <span class="pt-tree-node-caret pt-tree-node-caret-open pt-icon-standard"></span>

                                    <span class="pt-tree-node-label">Description</span>
                                </div>
                                <ul class="pt-tree-node-list">
                                    <li class="pt-tree-node p-4">
                                        <div dangerouslySetInnerHTML={{ __html: description }}></div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                }

                <div style={flexStyle}>

                    <p>
                        {tags}
                    </p>

                    <div>
                        {this.props.isAuthenticated &&
                            saveOrRemoveButton
                        }

                    </div>

                </div>

            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        cardCollapse: appState.search.cardCollapse,
        isAuthenticated: appState.baselayout.isAuthenticated,
        cardJson: appState.search.cardJson,
        token: appState.baselayout.token,
        savedCardJson: appState.saved.cardJson

    }
}


export default withRouter(connect(mapStateToProps)(ResultCard))