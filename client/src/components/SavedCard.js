import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios';

import { setReduxStateSaved } from '../redux/saved/actionCreators'
import { setReduxState } from '../redux/search/actionCreators'

class SavedCard extends Component {


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

    editJobPostCheckbox = (e) => {

        let that = this

        let guid = e.currentTarget.dataset.cardId
        let jobPosts = this.props.cardJson
        let checkbox = e.currentTarget.name

        let jobPost = jobPosts.reduce((total, post) => {
            if(post.guid === guid) {
                return post
            } else {
                return total
            }

        }, {})

        jobPost[checkbox] = !(jobPost[checkbox])



        axios.defaults.headers.common['Authorization'] = `JWT ${this.props.token}`;

        axios.post('/api/editjobpost', {
            jobPost: jobPost
        })
        .then(function (response) {

            console.log('--got response--')
            console.log(response)
            that.props.dispatch(setReduxStateSaved({ needsUpdate: true }))

        })
        .catch(function (error) {
            console.log(error)
        })

    }


    editJobPostNotes = (e) => {

        let that = this

        let guid = e.currentTarget.dataset.cardId
        let jobPosts = this.props.cardJson
        let checkbox = e.currentTarget.name

        let jobPost = jobPosts.reduce((total, post) => {
            if(post.guid === guid) {
                return post
            } else {
                return total
            }

        }, {})
        console.log(e.currentTarget.value)
        jobPost.notes = e.currentTarget.value


        axios.defaults.headers.common['Authorization'] = `JWT ${this.props.token}`;

        axios.post('/api/editjobpost', {
            jobPost: jobPost
        })
        .then(function (response) {

            console.log('--got response--')
            console.log(response)
            that.props.dispatch(setReduxStateSaved({ needsUpdate: true }))

        })
        .catch(function (error) {
            console.log(error)
        })

    }


    cardCollapse = (e) => {

        let guid = e.currentTarget.dataset.cardId

        let cardState = Object.assign({}, this.props.cardCollapse, {
            [guid]: !this.props.cardCollapse[guid]

        })


        this.props.dispatch(setReduxStateSaved({ cardCollapse: cardState }))

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

        let applied = this.props.data.applied
        let response = this.props.data.response
        let interviewed = this.props.data.interviewed
        let notes = this.props.data.notes

        let collapse = this.props.cardCollapse[guid]

        let flexStyle = { display: 'flex', justifyContent: 'space-between', width: '100%' }
        let flexStyleCheckbox = { display: 'flex', width: '100%' }
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
                            <button className='pt-button pt-icon-remove' onClick={this.removeJobPost} data-card-id={guid}>Remove</button>
                        }

                    </div>

                </div>

                <div style={flexStyleCheckbox}>
                    <label class="pt-control pt-checkbox pt-large pr-3"  >
                        <input type="checkbox" name="applied" onClick={this.editJobPostCheckbox} data-card-id={guid} checked={applied} />
                        <span class="pt-control-indicator"></span>
                        Applied
                    </label>
                    <label class="pt-control pt-checkbox pt-large pr-3">
                        <input type="checkbox" name="response" onClick={this.editJobPostCheckbox} data-card-id={guid} checked={response} />
                        <span class="pt-control-indicator"></span>
                        Response
                    </label>
                    <label class="pt-control pt-checkbox pt-large pr-3">
                        <input type="checkbox" name="interviewed" onClick={this.editJobPostCheckbox} data-card-id={guid} checked={interviewed} />
                        <span class="pt-control-indicator"></span>
                        Interviewed
                    </label>
                </div>
                <h6>Notes: </h6>
                <div>
                    <textarea class="pt-input pt-fill" name="notes" onBlur={this.editJobPostNotes} data-card-id={guid} dir="auto">{notes}</textarea>
                </div>

            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        cardCollapse: appState.saved.cardCollapse,
        isAuthenticated: appState.baselayout.isAuthenticated,
        cardJson: appState.saved.cardJson,
        token: appState.baselayout.token

    }
}


export default withRouter(connect(mapStateToProps)(SavedCard))