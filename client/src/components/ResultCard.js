import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios';

import { setReduxState } from '../redux/search/actionCreators'

class ResultCard extends Component {


    cardCollapse = (e) => {

        let guid = e.currentTarget.dataset.cardId

        let cardState = Object.assign({}, this.props.cardCollapse, {
            [guid]: !this.props.cardCollapse[guid]

        })

        
        this.props.dispatch(setReduxState({ cardCollapse: cardState }))

    }


    render() {

        if (this.props.data.location) {
            let location = this.props.data.location[0]['_']
        }

        let updated = this.props.data['a10:updated'][0]
        let author = this.props.data['a10:author'][0]['a10:name']
        let category = this.props.data.category
        let description = this.props.data.description
        let guid = this.props.data.guid[0]['_']
        let title = this.props.data.title
        let postDate = this.props.data.pubDate
        let tags

        if (this.props.data.category) {
            tags = category.map((t) => {
                return (<span class="pt-tag pt-large pt-intent-primary mr-2">{t}</span>)
            })
        }

        let collapse = this.props.cardCollapse[guid]

        let flexStyle = { display: 'flex', justifyContent: 'space-between', width: '100%' }
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

                <p>
                    {tags}
                </p>

            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        cardCollapse: appState.search.cardCollapse

    }
}


export default withRouter(connect(mapStateToProps)(ResultCard))