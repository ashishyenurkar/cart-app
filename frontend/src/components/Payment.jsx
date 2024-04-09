import React, { Fragment, useRef } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from '@mui/material';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./payment.css"

import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createOrder } from '../Actions/orderAction';

const stripePromise = loadStripe("pk_test_51NTesYSFOGNeWuAgl14oEIODLmklFqV6CMM7aUgxkFAGITFUkgPG3nmCO1j9tbxocmDb4l99HGAGSTnHkLuGu1N600fvizudF8");

const PaymentForm = () => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.username,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: "IN",
          },
        },
      });

      if (error) {
        console.log(error);
        payBtn.current.disabled = false;
      } else {
        const paymentData = {
          amount: totalAmount * 100, // Stripe expects the amount in cents
          payment_method: paymentMethod.id,
          shippingInfo,
          cartItems,
        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        };

        const { data } = await axios.post("http://localhost:8080/api/payment/process", paymentData, config);
console.log("client secret",data)
        if (data.paymentIntent.client_secret) {
          const result = await stripe.confirmCardPayment(data.paymentIntent.client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: "IN",
                },
              },
            },
          });

          if (result.error) {
            payBtn.current.disabled = false;
            console.log(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              const order = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice: totalAmount, // Update with actual item price
                totalPrice: totalAmount, // Update with actual total price
                paymentInfo: {
                  id: result.paymentIntent.id,
                  status: result.paymentIntent.status,
                },
              };

              dispatch(createOrder(order));
              navigate("/success");
            } else {
              console.log("There's some issue while processing payment");
            }
          }
        } else {
         console.log("Failed to fetch client secret");
        }
      }
    } catch (error) {
      console.log(error);
      payBtn.current.disabled = false;
      console.log(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ${totalAmount}`} // Update with actual total amount
            ref={payBtn}
            className='paymentFormBtn'
          />
        </form>
      </div>
    </Fragment>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
