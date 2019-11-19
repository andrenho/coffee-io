import React from 'react';
import { Link } from 'react-router-dom'

export default function Finalized(props) {
    return (
        <div className="py-5 text-center">
            <p className="lead">Thank you for shopping with us. Your cup of coffee is underway.</p>
            <Link className="btn btn-primary mb-5" to="/cart">Continue shopping</Link>
        </div>
    );
}

// vim:st=4:sts=4:sw=4:expandtab
