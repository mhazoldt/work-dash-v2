import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import Header from './Header'


class BaseLayout extends Component {

    render() {

        return (
            <div>
                <Header />
                {this.props.children}

            </div>
        )
    }
}


export default withRouter(connect(null)(BaseLayout))