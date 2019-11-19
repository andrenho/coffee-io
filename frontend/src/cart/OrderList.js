import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem } from '../state/actions';
import Coffee from './Coffee';

function mapDispatchToProps(dispatch) {
    return {
        removeItem: i => dispatch(removeItem(i)),
    };
}

class OrderList extends Component {
    removeItem = (i) => {
        if (window.confirm("Are you sure you want to remove this item?")) {
            this.props.removeItem(i);
        }
    }

    render() {
        let rows = [];

        for (let i = 0; i < this.props.cart.items.length; ++i) {
            const func = () => this.removeItem(i);
            const item = this.props.cart.items[i];
            const removeButton = this.props.showRemoveButtons ? (
                <td className="text-center align-middle">
                    <button type="button" className="btn btn-danger btn-sm" onClick={func}>
                        X
                    </button>
                </td>) : <td></td>;
            rows.push(
                <tr key={'item_' + i}>
                    <th scope="row" className="text-right align-middle">{i+1}</th>
                    <td className="text-center align-middle">
                        <Coffee cup={item} width={60} height={60} simple/>
                    </td>
                    <td className="align-middle">
                        {item.recipeName ? item.recipeName : item.description}
                    </td>
                    <td className="text-right align-middle">${item.totalCost.toFixed(2)}</td>
                    {removeButton}
                </tr>
            );
        }

        const deleteColumn = this.props.showRemoveButtons ? <th scope="col" className="text-center">Delete item</th> : <th></th>;

        return (
            <table className="table table-hover table-responsive">
                <thead>
                    <tr>
                        <th scope="col" className="text-right">#</th>
                        <th scope="col" className="w-50 text-left" colSpan={2}>Item</th>
                        <th scope="col" className="text-right">Price</th>
                        {deleteColumn}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <th scope="row">Total</th>
                        <th className="text-right" scope="row">${this.props.cart.total.toFixed(2)}</th>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        );
    }
};

export default connect(null, mapDispatchToProps)(OrderList);

// vim:st=4:sts=4:sw=4:expandtab
