import React from 'react';
import './App.css';


class Products extends React.Component {


    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="productsGrid" >
                <p style={{ fontSize: '20px' }}>{this.props.product.name}</p>
                <p>{this.props.product.price} Dollars</p>
                <p>Amount: {this.props.product.amount}</p>
                <button className="addButton" onClick={() => this.props.onIncrement(this.props.product)}>Add to cart</button>

            </div>
        )
    }
}

export default Products;