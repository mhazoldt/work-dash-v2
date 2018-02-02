import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from 'axios'
import { Toaster, Position, Intent } from "@blueprintjs/core";
import { setReduxStateBase } from '../redux/baselayout/actionCreators'


class Login extends Component {

    state = {
        username: '',
        password: '',
        isFetching: false
    }


    submitLogin = () => {

        let that = this

        let username = this.state.username
        let password = this.state.password

        let passwordNotBlank = (password.length > 0)
        let usernameNotBlank = (username.length > 0)

        if (!passwordNotBlank) {
            that.makeToaster('Password can not be blank', Intent.WARNING)

        } else if (!usernameNotBlank) {
            that.makeToaster('Username can not be blank', Intent.WARNING)

        } else if (usernameNotBlank && passwordNotBlank) {
            that.setState({
                username: '',
                password: '',
                isFetching: true
            })

            makeRequest()
        }

        function makeRequest() {


            axios.post('/api/user/login', {
                username: username,
                password: password

            })
                .then(function (response) {
                    that.setState({
                        isFetching: false
                    })
                    console.log('--got response--')
                    if (response.data.message === 'Unknown User') {
                        that.makeToaster('username not found', Intent.WARNING)
                    } else if (response.data.message === 'Invalid password') {
                        that.makeToaster('Invalid Login', Intent.DANGER)

                    } else if (response.data.message === 'ok') {
                        that.props.dispatch(setReduxStateBase({ isAuthenticated: true, authUsername: response.data.authUsername, token: response.data.token }))

                        window.sessionStorage.setItem("isAuthenticated", true);
                        window.sessionStorage.setItem("authUsername", response.data.authUsername);
                        window.sessionStorage.setItem("token", response.data.token);

                        that.makeToaster(`Welcome ${that.props.authUsername}`, Intent.SUCCESS)
                        that.props.history.push("/");
                    }
                    console.log(response)

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }



    handleChange = (e) => {

        this.setState({ [e.currentTarget.name]: e.currentTarget.value })

    }

    submitOnEnter = (e) => {

        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            this.submitLogin()
        }

    }

    makeToaster = (message, intent) => {
        console.log('tried to make toaster')
        let newToster = Toaster.create({ position: Position.TOP, }, document.body)
        newToster.show({ message: message, className: "pt-intent-primary mx-auto", intent: intent, timeout: 2000 })
    }


    render() {

        return (

            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <div className='col-6'>

                        {!this.state.isFetching &&
                            <div className="pt-card pt-elevation-2">
                                <h4 className='mb-3' style={{ textAlign: 'center', textDecoration: 'underline' }}>Login</h4>

                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-person"></span>
                                        <input className="pt-input" type="text" name="username" onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Username" dir="auto" />
                                    </div>
                                </label>
                                <div className='mb-4' />
                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-key"></span>
                                        <input className="pt-input" type="password" name="password" onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Password" dir="auto" />
                                    </div>
                                </label>
                                <button type="button" class="pt-button pt-icon-log-in pt-intent-primary" onClick={this.submitLogin}>Login</button>

                            </div>
                        }
                        {this.state.isFetching &&
                            <div className="pt-card pt-elevation-2">
                                <h4 className='mb-3' style={{ textAlign: 'center', textDecoration: 'underline' }}>Login</h4>

                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-person"></span>
                                        <input className="pt-input pt-skeleton" type="text" name="username" onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Username" dir="auto" />
                                    </div>
                                </label>
                                <div className='mb-4' />
                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-key"></span>
                                        <input className="pt-input pt-skeleton" type="password" name="password" onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Password" dir="auto" />
                                    </div>
                                </label>
                                <button type="button" class="pt-button pt-icon-log-in pt-intent-primary" disabled >Login</button>

                            </div>
                        }
                    </div>
                </div>
            </div>

        )
    }
}


function mapStateToProps(appState) {
    return {
        authUsername: appState.baselayout.authUsername

    }
}

export default connect(mapStateToProps)(Login)