import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'
import {useNavigate} from 'react-router-dom'

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products',{ withCredentials: true }); // Adjust the API endpoint according to your backend route
      setProducts(response.data);
      //console.log('products',response)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleDelete = async (productId) => {
    // Handle delete functionality here
    try {
      await axios.delete(`http://localhost:8080/api/product/delete/${productId}`, { withCredentials: true }); 
      alert('Product deleted successfully!');
      fetchProducts(); // Refresh products after delete
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const addProduct = ( ) =>{
navigate('/addproduct')
  }
  const viewOrders = ( ) =>{
    navigate('/orders')
      }

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <div className="admin-dashboard-header">
        <button className="add-product-button" onClick={addProduct}>Add Product</button>
        <button className="orders-button" onClick={viewOrders}>View Orders</button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>₹ {product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(product._id)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(product._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
