import React, { Component } from 'react';
import currentArch from '../state/arch';
import archs from '../arch';

export default class BackendSelect extends Component {

    options() {
        return archs.map(arch =>
            <a className="dropdown-item" href={arch.frontend} key={arch.code}>
                {arch.backend}
            </a>);
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                    {currentArch().backend}
                </button>
                <div className="dropdown-menu">
                    {this.options()}
                </div>
            </div>
        );
    }
}
