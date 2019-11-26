import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import OrderList from '../cart/OrderList';
import currentArch from '../state/arch';

const imageStyle = {
    marginTop: "20px",
}

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            items: [],
        };
    }

    componentDidMount() {
        axios.get(currentArch().api + '/orders')
            .then(res => this.setState({ loaded: true, items: res.data, }))
            .catch(error => { throw(error); });
    }

    renderData() {
        if (!this.state.loaded)
            return <FontAwesomeIcon icon={faSpinner} style={imageStyle} size="4x" className="d-inline-block align-middle" pulse />;
        let orders = [];
        if (this.state.items.length === 0)
            orders.push(<div>No orders pending.</div>);
        let i = 0;
        for (let item of this.state.items) {
            orders.push(
                <div className="card w-auto" key={item.id}>
                    <div className="card-header" id={"heading" + i}>
                        <h5 className="mb-0 text-left">
                            <button className="btn btn-secondary" data-toggle="collapse" data-target={"#collapse" + i}>
                                To: {item.deliveryAddress.name} (issued {(new Date(item.orderDate)).toLocaleString()})
                            </button>
                        </h5>
                    </div>
                    <div id={"collapse" + i} className="collapse" data-parent="#accordion">
                        <div className="card-body">
                            <p className="lead text-left">Cart</p>
                            <OrderList cart={item} />
                            <p className="lead text-left">Delivery info</p>
                            <table class="table table-hover w-auto">
                                <tbody>
                                    <tr><th scope="row" className="text-left">Name</th><td className="text-left">{item.deliveryAddress.name}</td></tr>
                                    <tr><th scope="row" className="text-left">E-mail</th><td className="text-left">{item.deliveryAddress.email}</td></tr>
                                    <tr><th scope="row" className="text-left">Address</th><td className="text-left">{item.deliveryAddress.address}</td></tr>
                                    <tr><th scope="row" className="text-left">City</th><td className="text-left">{item.deliveryAddress.city}</td></tr>
                                    <tr><th scope="row" className="text-left">State</th><td className="text-left">{item.deliveryAddress.state}</td></tr>
                                    <tr><th scope="row" className="text-left">Zip code</th><td className="text-left">{item.deliveryAddress.zip}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
            ++i;
        }

        return <div id="accordion">{orders}</div>;
        // https://getbootstrap.com/docs/4.0/components/collapse/
    }

    render() {
        return (
            <div>
                <div className="py-5 text-center">
                    <p className="lead">List of pending orders.</p>
                    {this.renderData()}
                    <p><i>(since this is a demonstration website, all orders are deleted at midnight)</i></p>
                </div>
            </div>
        );
    }
}

export default Admin;

// vim:st=4:sts=4:sw=4:expandtab
