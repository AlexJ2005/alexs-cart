import React, { Component } from 'react';
import './App.css';
import Products from './Products'
import TotalCost from './TotalCost'
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class App extends Component {




  render() {
    return (


      <div>

        {this.props.loading ? <div>loading</div> : (
          <div>

            <header className="shopping-header">
              <h1>Shopping cart</h1>
              <button className="addButton" onClick={() => this.props.clearCart(this.props.products)}>Clear cart</button>
              <TotalCost className="totalCost" products={this.props.products} />
            </header>
            <div className="products-container">

              {this.props.products.map((product) =>
                <Products className="productsGrid" product={product} key={product._id} onIncrement={this.props.increment} />
              )}

            </div>
          </div>
        )}


      </div>


    )
  }
}

export default App;
