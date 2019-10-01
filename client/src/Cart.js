import React, { Component } from 'react'
import { Link } from "react-router-dom";


export class Cart extends Component {
    render() {
        return (
            <div>
                <Link to='/' className="home-button">Homepage</Link>
                {this.props.products.map(product => {
                    if (product.amount > 0) {
                        return (<div key={product._id} className="products-cart-container">
                            <p className="products-cart" >{product.name} {product.amount}</p>
                            <button onClick={() => this.props.incrementCart(product)} className="delete-button">+</button>
                            <button onClick={() => this.props.subtractCart(product)} className="delete-button">-</button>
                        </div>
                        )
                    }
                })}

            </div>
        )
    }
}

export default Cart
