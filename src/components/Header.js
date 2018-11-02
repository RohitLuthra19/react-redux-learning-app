import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/authentication';

class Home extends React.Component {

    onLogout = (e) => {
        e.preventDefault();
        this.props.logout(this.props.history);
    }

    render() {
        const { isAuthenticated, user }  = this.props.auth;
        const authLinks=(
            <ul className="nav navbar-nav ml-auto">         
                <li className="nav-item">
                    { user.name }
                    <a className="nav-link" href="/logout" onClick={this.onLogout}>Logout</a>
                </li>
            </ul>
        )

        const guestLinks= (
            <ul className="nav navbar-nav ml-auto">           
                <li className="nav-item active">
                    <a className="nav-link" href="/register">Register <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
            </ul>
        )

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                    <a className="navbar-brand" href="/">App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        {
                            isAuthenticated ? authLinks : guestLinks
                        }
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {
    logout
})(withRouter(Home));