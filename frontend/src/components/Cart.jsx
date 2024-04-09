// cart.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { additemsToCart, removeItemsFromCart } from '../Actions/cartActions';
import './Cart.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
console.log("cartItems",cartItems);
    const handleRemoveFromCart = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const increaseQuantity = (id, quantity, stock) => {
        if (stock <= quantity) return alert.error(`Only ${quantity} products remaining in stock.`);
        const newQty = quantity + 1;

        dispatch(additemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity, stock) => {
        if (1 >= quantity) return alert.error(`product count must be a 1 in cart`);
        const newQty = quantity - 1;

        dispatch(additemsToCart(id, newQty));
    }
const buyNow = ()=>{
    navigate("/checkout");
}

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item) =>  (
                   
                    <li key={item.product} className="cart-item">
                        <div className="item-info">
                            <p>{item.name}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleRemoveFromCart(item.product)}>Remove</button>
                            {/* Plus and minus buttons for increasing and decreasing quantity */}
                            <div className="quantity-buttons">
                                <button onClick={() => increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                                <button onClick={() => decreaseQuantity(item.product,item.quantity,item.stock)}>-</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="buy-now-button" onClick={()=>buyNow()} >Buy Now</button>
        </div>
    );
};

export default Cart;
