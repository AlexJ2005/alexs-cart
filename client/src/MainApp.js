import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import Cart from './Cart';
import axios from 'axios'

export class MainApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            products: []
        }

        //Api call

        this.fetchItems();

    }

    deleteFromCart = (id) => {
        // Deletes the item from the cart by changing the amount to zero
        axios.patch(`https://localhost:5000/api/${id}`, { amount: 0 }).then((res) => this.setState({ products: res.data.products }))
    }

    subtractFromCart = (product) => {
        const products = [...this.state.products];
        const index = products.indexOf(product);
        products[index] = { ...product }
        products[index].amount--;

        axios.patch(`https://localhost:5000/api/${product._id}`, { amount: products[index].amount }).then(res => this.setState({ products: res.data.products }))
    }


    fetchItems = () => {
        //Gets all the data from the api and adds it to the state
        axios.get('https://localhost:5000/api',
            {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "https://localhost:5000/api"
                }
            })
            .then(res => {
                this.setState({ products: res.data.products, loading: false });
            })
            .catch(err => console.log(err))

    }


    increment = product => {
        //Makes a copy of the product that is passed as an argument, then gets the index and adds one to the amount property
        const products = [...this.state.products];
        const index = products.indexOf(product);
        products[index] = { ...product }
        products[index].amount++;
        //  this.setState(({ products }))

        axios.patch(`https://localhost:5000/api/${product._id}`, { amount: products[index].amount }).then(response => this.setState({ products: response.data.products }))

    }


    clearCart = product => {
        //Changes all the products amount to zero

        product.map((products) => {
            axios.patch(`https://localhost:5000/api/${products._id}`, { amount: 0 }).then(response => this.setState({ products: response.data.products })).catch(err => console.log(err))
        })


    }

    render() {
        return (
            <Router>
                <Route path='/cart' render={() => <Cart incrementCart={this.increment} subtractCart={this.subtractFromCart} products={this.state.products}></Cart>} />
                <Route path='/' exact render={() => <App deleteFromCart={this.deleteFromCart} loading={this.state.loading} products={this.state.products} clearCart={this.clearCart} increment={this.increment}></App>} />
            </Router>
        )
    }
}

export default MainApp
