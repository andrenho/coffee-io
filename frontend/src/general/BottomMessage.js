import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BottomMessage extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    dismiss = () => {
        this.setState({ visible: false });
    }

    render () {
        const cl = "navbar fixed-bottom navbar-expand-sm navbar-dark bg-danger " + (!this.state.visible ? "d-none" : "");
        return (
            <nav className={cl}>
                <span className="navbar-text">
                    IMPORTANT! This is not a real website, it serves as my portfolio for web development on cloud.
                    See more about the <Link to="/architecture">serverless cloud architecture</Link> used on this website.
                    (<a href="#!" onClick={this.dismiss}>Dismiss</a>)
                </span>
            </nav>
        );
    }
}

// vim:st=4:sts=4:sw=4:expandtab
