import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './userOrders.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user orders from the backend
    axios.get(`http://localhost:8080/api/order/getuserorder/${user._id}`, { withCredentials: true })
      .then(response => {
        setOrders(response.data.orders);
      })
      .catch(error => {
        console.error('Error fetching user orders:', error);
      });
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
       <p className="no-orders-message">No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
