import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderList from './OrderList';

const mapStateToProps = state => {
    return { cart: state.cart };
}

class Cart extends Component {

    checkCart = (e) => {
        if (this.props.cart.items.length === 0) {
            alert("Add at least one item before checking out.");
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto">
                <OrderList cart={this.props.cart} showRemoveButtons />
                <div className="btn-group" >
                    <Link className="btn btn-primary" to="/cart/newitem">Add a new item</Link>
                    <Link className="btn btn-success" onClick={e => this.checkCart(e)} to="/cart/checkout">Proceed to checkout</Link>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Cart);

// vim:st=4:sts=4:sw=4:expandtab
