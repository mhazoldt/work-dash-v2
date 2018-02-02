import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Header from './Header'
import { setReduxStateBase } from '../redux/baselayout/actionCreators'

class BaseLayout extends Component {


    checkPreviousToken = () => {
        let isAuthenticated = window.sessionStorage.getItem("isAuthenticated");
        let token = window.sessionStorage.getItem("token");
        let authUsername = window.sessionStorage.getItem("authUsername");


        if(isAuthenticated) {
            this.props.dispatch(setReduxStateBase({ isAuthenticated: true, authUsername: authUsername, token: token }))

        }
        
    }


    componentWillMount() {
        this.checkPreviousToken()
    }


    render() {

        return (
            <div>
                <Header />
                {this.props.children}

            </div>
        )
    }
}


function mapStateToProps(appState) {
    return {
        token: appState.baselayout.token,
        authUsername: appState.baselayout.authUsername,
        isAuthenticated: appState.baselayout.isAuthenticated

    }
}

export default withRouter(connect(mapStateToProps)(BaseLayout))