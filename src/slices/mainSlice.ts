import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

    type Product = {
        id:  number
        title: string,
        description: string,
        category: string,
        price: number,
        images: string[],
        quantity: number | 0,
    }

type InitialState = {
    products: Product[],
    cart: Product[],
}

const initialState: InitialState = {cart: [], products: []}

const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        addProducts(state, action: PayloadAction<Product[]>) {
            state.products.push(...action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            state.products = state.products.map((prod) => prod.id == action.payload.id ? action.payload: prod);
        },
        addToCart(state, action: PayloadAction<Product>) {
            state.cart.push(action.payload);
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter(p => p.id !== action.payload.id);
        },
        updateCartQuantity(state, action: PayloadAction<Product>) {
            state.cart = state.cart.map(p => p.id == action.payload.id ? action.payload : p);
        }
    }
});

export const {addProducts, updateProduct, addToCart, removeFromCart, updateCartQuantity} = mainSlice.actions;
export default mainSlice.reducer;