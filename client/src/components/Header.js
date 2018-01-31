import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Colors, Icon } from "@blueprintjs/core"


class Header extends Component {
    render() {
        console.log(Colors)
        return (
            <nav className="pt-navbar" style={{ backgroundColor: Colors.COBALT3, color: Colors.WHITE }}>
                <div className="container">
                    <div className="pt-navbar-group pt-align-left">
                        <NavLink to='/' activeClassName=''><div className="pt-navbar-heading" style={{ color: Colors.WHITE }}>WorkDash</div></NavLink>
                    </div>
                    <div className="pt-navbar-group pt-align-right">
                        <NavLink to='/register' activeClassName=''><button className="pt-button pt-minimal" style={{ color: Colors.WHITE }}><Icon iconName="pt-icon-new-person" style={{ color: Colors.WHITE }} />Register</button></NavLink>
                        <NavLink to='/login' activeClassName=''><button className="pt-button pt-minimal " style={{ color: Colors.WHITE }}><Icon iconName="pt-icon-log-in" style={{ color: Colors.WHITE }} />Login</button></NavLink>


                    </div>
                </div>
            </nav>

        )
    }
}

// export default withRouter(connect(null)(Header))
export default Header