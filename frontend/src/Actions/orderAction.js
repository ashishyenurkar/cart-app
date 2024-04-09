import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: "orderRequest",
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/order/create",
      order, // Pass order data here
      config // Pass config object with headers and withCredentials option
    );

    dispatch({
      type: "orderSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "orderFailure",
      payload: error.response.data.message,
    });
  }
};
