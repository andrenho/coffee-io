import React, { Component } from 'react';

const labelStyle = {
    width: "120px",
    minWidth: "120px",
    color: "black",
    opacity: 1,
}

export default class Selector extends Component {
    constructor(props) {
        super(props);
        if (!props.buttons)
            console.error("Property 'buttons' missing.");
        if (!props.onSelected)
            console.error("Property 'onSelected' missing.");
        if (!props.name)
            console.error("Property 'name' missing.");
    }

    title() {
        return <button type="button" className="btn btn-outline-dark" style={labelStyle} disabled>{this.props.name}</button>;
    }

    renderButtons() {
        const buttons = this.props.buttons.map(btn => {
            const myStyle = {
                // width: "150px",
                color: btn.lightColor ? "black" : "white",
                backgroundColor: btn.color,
                borderColor: "black",
            }

            if (!btn.dropdown) {
                return <button onClick={() => this.props.onSelected(btn.value)} type="button" className="btn btn-primary" style={myStyle} key={btn.name}>{btn.name}</button>;
            } else {
                const items = btn.dropdown.map(d => <a className="dropdown-item" style={myStyle} href="#!" key={d.name} onClick={() => this.props.onSelected(d.value)}>{d.name}</a>);
                return (
                    <div className="btn-group" role="group" key={btn.name}>
                        <button type="button" className="btn btn-primary dropdown-toggle" style={myStyle} data-toggle="dropdown">{btn.name}</button>
                        <div className="dropdown-menu" style={myStyle} key={btn.value}>{items}</div>
                    </div>
                );
            }
        });

        return (
            <div className="btn-toolbar mb-3" key={this.props.name}>
                <div className="btn-group">
                    {this.title()}
                    {buttons}
                </div>
            </div>
        );
    }

    renderSelector() {
        const optionStyle = { borderColor: "black" };
        let buttons = [];
        let i = 1;
        for (let btn of this.props.buttons) {
            let classes = "btn btn-outline-secondary";
            if (i === this.props.selected) {
                classes += " active";
            }
            buttons.push(
                <label className={classes} style={optionStyle} onClick={() => this.props.onSelected(btn.value)} key={btn.name}>
                    <input type="radio" name="options" id="small" autoComplete="off" />{btn.name}
                </label>);
            ++i;
        }
        return (
            <div className="btn-toolbar mb-3" key="Size">
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    {this.title()}
                    {buttons}
                </div>
            </div>
        );
    }

    render() {
        if (this.props.selector)
            return this.renderSelector();
        else
            return this.renderButtons();
    }
}

// vim:st=4:sts=4:sw=4:expandtab
