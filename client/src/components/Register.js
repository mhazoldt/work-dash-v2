import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import axios from 'axios'


class Register extends Component {

    state = {
        username: '',
        password: '',
        passwordConfirm: ''
    }


    submitRegistration = () => {

        let username = this.state.username
        let password = this.state.password

        this.setState({
            username: '',
            password: '',
            passwordConfirm: ''
        })

        axios.post('http://localhost:3001/api/user/register', {
            headers: {

                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST',
                'Access-Control-Allow-Headers': '*'

              },
              body: {
                username: username,
                password: password
            }
        })
        .then(function (response) {
            console.log('--got response--')
            console.log(response)

        })
        .catch(function (error) {
            console.log(error);
        });
       

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


    render() {

        return (
            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className="pt-card pt-elevation-2">
                            <h4 className='mb-3' style={{ textAlign: 'center', textDecoration: 'underline' }}>Register</h4>

                            <label className="pt-label">
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-person"></span>
                                    <input className="pt-input" type="text" name='username' onChange={this.handleChange} placeholder="Username" dir="auto" />
                                </div>
                            </label>
                            <div className='mb-4' />
                            <label className="pt-label">
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-key"></span>
                                    <input className="pt-input" type="password" name='password' onChange={this.handleChange} placeholder="Password" laceholder="Password" dir="auto" />
                                </div>
                            </label>
                            <label className="pt-label">
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-tick"></span>
                                    <input className="pt-input" type="password" name='passwordConfirm' onChange={this.handleChange} placeholder="Confirm Password" dir="auto" />
                                </div>
                            </label>
                            <button type="button" class="pt-button pt-icon-new-person pt-intent-primary" onClick={this.submitRegistration}>Register</button>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null)(Register)