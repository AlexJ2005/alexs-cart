import React from 'react';
import './App.css';
import { Link } from "react-router-dom";



class TotalCost extends React.Component {

   

    totalPrice = (total, current) => {
        return total + current.amount * current.price;
    }

    render() {
        let startvalue = 0;
        return (

            <div>
                <div className="totalCost-elements">
                    <Link to='/cart'>  <img style={{ paddingTop: "40px" }} src={require('./images/shop.png')} alt="shopping cart" width="120" height="100" ></img> </Link>
                    <p style={{ margin: "0px", paddingTop: "80px", paddingRight: "200px" }}>
                        {this.props.products.reduce(this.totalPrice, startvalue)}
                        $
                    </p>

                </div>
            </div>

        )
    }
}

export default TotalCost;