import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


class Edit extends Component {

    render() {

        return (
            <div>
                <p>
                    Edit Page
                </p>
            </div>

        )
    }
}


export default withRouter(connect(null)(Edit))