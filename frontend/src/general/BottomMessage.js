import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import currentArch from '../state/arch';

export default class BottomMessage extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
    }

    dismiss = () => {
        this.setState({ visible: false });
    }

    currentBackend() {
        return currentArch().backend;
    }

    render () {
        const cl = "navbar fixed-bottom navbar-expand-sm navbar-dark bg-danger " + (!this.state.visible ? "d-none" : "");
        return (
            <nav className={cl}>
                <span className="navbar-text">
                    IMPORTANT! This is not a real website, it serves as my portfolio for web development on cloud.
                    See more about the <Link to="/architecture">architecture</Link> used on this website for 
                    the <b>{this.currentBackend()}</b> backend, or select another backend at the top.
                </span>
                <button type="button" className="close float-right ml-auto" onClick={this.dismiss}>
                    <span>&times;</span>
                </button>
            </nav>
        );
    }
}

// vim:st=4:sts=4:sw=4:expandtab
