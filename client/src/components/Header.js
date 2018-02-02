import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Colors, Icon } from "@blueprintjs/core"
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Popover } from "@blueprintjs/core";
import { setReduxStateBase } from '../redux/baselayout/actionCreators'


class Header extends Component {

    logout = (e) => {
        e.preventDefault();
        window.sessionStorage.setItem("isAuthenticated", false);
        window.sessionStorage.setItem("authUsername", '');
        window.sessionStorage.setItem("token", '');

        this.props.dispatch(setReduxStateBase({ isAuthenticated: false, authUsername: '', token: '' }))

    }


    render() {
        
        return (
            <nav className="pt-navbar" style={{ backgroundColor: Colors.COBALT3, color: Colors.WHITE }}>
                <div className="container">
                    <div className="pt-navbar-group pt-align-left">
                        <NavLink to='/' activeClassName=''><div className="pt-navbar-heading" style={{ color: Colors.WHITE }}><Icon iconName="pt-icon-application" className="mr-1" style={{ color: Colors.WHITE }} />WorkDash</div></NavLink>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        {!this.props.isAuthenticated &&
                            <NavLink to='/register' activeClassName=''><button className="pt-button pt-minimal" style={{ color: Colors.WHITE }}><Icon iconName="pt-icon-new-person" style={{ color: Colors.WHITE }} />Register</button></NavLink>

                        }
                        {!this.props.isAuthenticated &&
                            <NavLink to='/login' activeClassName=''><button className="pt-button pt-minimal " style={{ color: Colors.WHITE }}><Icon iconName="pt-icon-log-in" style={{ color: Colors.WHITE }} />Login</button></NavLink>

                        }
                        {this.props.isAuthenticated &&
                            <Popover popoverClassName="pt-minimal">
                                <button className="pt-button pt-minimal " style={{ color: Colors.WHITE }}><Icon iconName="pt-icon-person" style={{ color: Colors.WHITE }} />{this.props.authUsername}</button>
                                <div style={{ padding: '15px', display: 'flex', flexFlow: 'column nowrap' }}>
                                    {/* <NavLink to='/login' activeClassName=''><button className="pt-button pt-minimal pt-intent-primary"><Icon iconName="pt-icon-cog" />Settings</button></NavLink> */}
                                    <NavLink to='/' activeClassName=''><button className="pt-button pt-minimal pt-intent-primary" onClick={this.logout}><Icon iconName="pt-icon-log-in" />Logout</button></NavLink>

                                </div>
                            </Popover>

                        }



                    </div>
                </div>
            </nav>

        )
    }
}


function mapStateToProps(appState) {
    return {
        authUsername: appState.baselayout.authUsername,
        isAuthenticated: appState.baselayout.isAuthenticated

    }
}

export default withRouter(connect(mapStateToProps)(Header))
// export default withRouter(connect(null)(Header))
// export default Header