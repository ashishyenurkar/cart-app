import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'; 
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {

    const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/product/create', productData, { withCredentials: true }); // Adjust the API endpoint according to your backend route
      alert('Product created successfully!');
      // Clear form fields after successful creation
      setProductData({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0
      });
      navigate('/admin')

    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <div className="create-product-container">
      <h2 className="create-product-title">Create Product</h2>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="form-input" required></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <input type="text" name="category" value={productData.category} onChange={handleChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Stock:</label>
          <input type="number" name="stock" value={productData.stock} onChange={handleChange} className="form-input" required />
        </div>
        <button type="submit" className="submit-button">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
