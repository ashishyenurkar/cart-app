import React, { useState } from 'react';
import './Checkout.css';
import { useSelector,useDispatch } from 'react-redux';
import { saveShippingInfo } from '../Actions/cartActions';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { shippingInfo:shipping_data } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phoneNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProceedToPayment = () => {
    // Store the shipping information in localStorage
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    // Dispatch action to save shipping info in Redux state
    dispatch(saveShippingInfo(shippingInfo));
    // Proceed to payment page or further processing
    // Example: history.push('/payment');
    navigate('/payment')
  };
  

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <form className="checkout-form">
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={shippingInfo.city} onChange={handleChange} />
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state" value={shippingInfo.state} onChange={handleChange} />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={shippingInfo.country} onChange={handleChange} />
        </div>
        <div>
          <label>Pin Code:</label>
          <input type="text" name="pinCode" value={shippingInfo.pinCode} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNo" value={shippingInfo.phoneNo} onChange={handleChange} />
        </div>
      </form>
      <button className="checkout-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
