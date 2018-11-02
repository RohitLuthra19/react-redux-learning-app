import React from 'react';
import "./Login.css";
import AuthService from '../services/AuthService';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.Auth.logout();
    }

    render() {
        return (
            <div className="Login">
                <h1>Thanks</h1>
            </div>
        )
    }
}
