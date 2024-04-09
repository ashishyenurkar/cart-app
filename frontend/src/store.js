import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/User";
import { productReducer } from "./Reducers/Product";
import {cartReducer} from "./Reducers/cartReducer";
import { orderReducer } from "./Reducers/orderReducer";




const store = configureStore({
  reducer: {
    user: userReducer,
    product:productReducer,
    cart:cartReducer,
    order:orderReducer
  },
});

export default store;
