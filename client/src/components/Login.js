import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Login extends Component {

    render() {

        return (
            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className="pt-card pt-elevation-2">
                            <h4 className='mb-3' style={{ textAlign: 'center', textDecoration: 'underline' }}>Login</h4>

                            <label className="pt-label">
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-person"></span>
                                    <input className="pt-input" type="text" placeholder="Username" dir="auto" />
                                </div>
                            </label>
                            <div className='mb-4' />
                            <label className="pt-label">
                                <div className="pt-input-group">
                                    <span className="pt-icon pt-icon-key"></span>
                                    <input className="pt-input" type="text" placeholder="Password" dir="auto" />
                                </div>
                            </label>
                            <button type="button" class="pt-button pt-icon-log-in pt-intent-primary">Login</button>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null)(Login)