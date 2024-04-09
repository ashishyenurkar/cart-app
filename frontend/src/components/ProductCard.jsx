// ProductCard.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { additemsToCart } from '../Actions/cartActions';
import "./ProductCard.css"


const ProductCard = ({ name, description, price, category, stock,id }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = { name, description, price, category, stock };
    dispatch(additemsToCart(id,1));
  };

  return (
    <div className="product-card">
      <div className="product-details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Stock:</strong> {stock}</p>
      </div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
