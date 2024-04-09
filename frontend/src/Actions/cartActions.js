
import axios from "axios";

//Add to cart
export const additemsToCart = (id, quantity) => async (dispatch, getState) => {
    console.log("id",id)
    const { data } = await axios.get(`http://localhost:8080/api/product/${id}`);

    dispatch({
        type: "ADD_TO_CART",
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            quantity,
        },
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

//Remove From Cart.
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: "REMOVE_CART_ITEM",
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};


// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: "SAVE_SHIPPING_INFO",
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
  