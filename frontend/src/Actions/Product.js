import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "productRequest",
    });

    const { data } = await axios.get(
      "http://localhost:8080/api/products",
      
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
//console.log("data",data);
    dispatch({
      type: "productSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "productFailure",
      payload: error.response.data.message,
    });
  }
};