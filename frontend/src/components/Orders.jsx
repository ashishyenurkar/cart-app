import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/order/getallorders',{ withCredentials: true }); // Adjust the API endpoint
      setOrders(response.data.orders);
     // console.log(response)
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const formatDateTime = (dateTimeString) => {
    const dateTimeParts = dateTimeString.split(/[-T:.Z]/);
    const formattedDate = new Date(Date.UTC(
      parseInt(dateTimeParts[0]),
      parseInt(dateTimeParts[1]) - 1,
      parseInt(dateTimeParts[2]),
      parseInt(dateTimeParts[3]),
      parseInt(dateTimeParts[4]),
      parseInt(dateTimeParts[5])
    ));
    return formattedDate.toLocaleString(); // Adjust the format as needed
  };
  return (
    <div>
      <h2>Order Table</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Created At</th>
            <th>Payment ID</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.orderStatus}</td>
              <td>{formatDateTime(order.createdAt)}</td>
              <td>{order.paymentInfo.id}</td>
              <td>{order.paymentInfo.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
