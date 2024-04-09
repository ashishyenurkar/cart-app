import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css'; // Import CSS file for styling

const EditProduct = () => {
const navigate = useNavigate()
  const { productId } = useParams(); // Get the productId from params
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${productId}`, { withCredentials: true });
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

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
      await axios.put(`http://localhost:8080/api/product/update/${productId}`, productData, { withCredentials: true }); 
      alert('Product updated successfully!');
     navigate('/admin')
      
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  return (
    <div className="edit-product-container">
      <h2 className="edit-product-title">Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
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
        <button type="submit" className="submit-button">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
