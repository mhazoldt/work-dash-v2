import React, { Component } from 'react';
import { connect } from 'react-redux'


import axios from 'axios'
import { Toaster, Position, Intent } from "@blueprintjs/core";

class Register extends Component {

    state = {
        username: '',
        password: '',
        passwordConfirm: '',
        isFetching: false
    }


    submitRegistration = () => {

        let that = this

        let username = this.state.username
        let password = this.state.password
        let passwordConfirm = this.state.passwordConfirm

        let passwordsMatch = (password === passwordConfirm)
        let passwordNotBlank = (password.length > 0)
        let usernameNotBlank = (username.length > 0)

        if (!passwordsMatch) {
            that.makeToaster('Passwords do not match', Intent.WARNING)

        } else if (!passwordNotBlank) {
            that.makeToaster('Password can not be blank', Intent.WARNING)

        } else if (!usernameNotBlank) {
            that.makeToaster('Username can not be blank', Intent.WARNING)

        } else if (passwordsMatch && passwordNotBlank && usernameNotBlank) {
            makeRequest()
        }

        function makeRequest() {
            that.setState({
                username: '',
                password: '',
                passwordConfirm: '',
                isFetching: true
            })

            axios.post('/api/user/register', {
                username: username,
                password: password

            })
                .then(function (response) {
                    that.setState({
                        isFetching: false
                    })
                    console.log('--got response--')
                    if (response.data.message === 'user created') {
                        that.makeToaster('User Created!', Intent.SUCCESS)
                    } else if (response.data.message === 'duplicate username') {
                        that.makeToaster('Username Unavailable', Intent.DANGER)

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
            this.submitRegistration()
        }

    }

    makeToaster = (message, intent) => {
        console.log('tried to make toaster')
        let newToster = Toaster.create({ position: Position.TOP, }, document.body)
        newToster.show({ message: message, className: "pt-intent-primary mx-auto", intent: intent })
    }

    render() {

        return (
            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        {this.state.isFetching &&
                            <div className="pt-card pt-elevation-2 pt-skeleton">
                                <h4 className='mb-3' style={{ textAlign: 'center', textDecoration: 'underline' }}>Register</h4>

                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-person"></span>
                                        <input className="pt-input pt-skeleton" type="text" name='username' onChange={this.handleChange} placeholder="Username" dir="auto" />
                                    </div>
                                </label>
                                <div className='mb-4' />
                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-key"></span>
                                        <input className="pt-input pt-skeleton" type="password" name='password' onChange={this.handleChange} placeholder="Password" placeholder="Password" dir="auto" />
                                    </div>
                                </label>
                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-tick"></span>
                                        <input className="pt-input" type="password" name='passwordConfirm' onChange={this.handleChange} placeholder="Confirm Password" dir="auto" />
                                    </div>
                                </label>
                                <button type="button" class="pt-button pt-icon-new-person pt-intent-primary" disabled >Register</button>

                            </div>


                        }

                        {!this.state.isFetching &&
                            <div className="pt-card pt-elevation-2">
                                <h4 className='mb-3' style={{ textAlign: 'center', textDecoration: 'underline' }}>Register</h4>

                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-person"></span>
                                        <input className="pt-input" type="text" name='username' onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Username" dir="auto" />
                                    </div>
                                </label>
                                <div className='mb-4' />
                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-key"></span>
                                        <input className="pt-input" type="password" name='password' onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Password" laceholder="Password" dir="auto" />
                                    </div>
                                </label>
                                <label className="pt-label">
                                    <div className="pt-input-group">
                                        <span className="pt-icon pt-icon-tick"></span>
                                        <input className="pt-input" type="password" name='passwordConfirm' onChange={this.handleChange} onKeyPress={this.submitOnEnter} placeholder="Confirm Password" dir="auto" />
                                    </div>
                                </label>
                                <button type="button" class="pt-button pt-icon-new-person pt-intent-primary" onClick={this.submitRegistration}>Register</button>

                            </div>


                        }



                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null)(Register)