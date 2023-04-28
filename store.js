import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import productReducer from "./productReducer";

export default configureStore({
    reducer:{
        cart:Cart,
        product:productReducer
    }
})