import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "../interfaces/CartItem";

interface CartState {
  items: CartItem[] | [];
  total: number;
  totPrice: number;
}
const CART_KEY = "cart";

const loadCart = () => {
  console.log("loadCart");
  try {
    const serializedState = localStorage.getItem(CART_KEY);
    if (serializedState === null) {
      return undefined;
    }
    console.log("loadCart", JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: CartState = loadCart() || {
  items: [],
  total: 0,
  totPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.items.some((item) => item.id === action.payload.id)) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        state.total += 1;
        state.totPrice += action.payload.price;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      } 
      else {
        state.items = [...state.items, action.payload];
        state.total += 1;
        state.totPrice += action.payload.price;
        localStorage.setItem(CART_KEY, JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      console.log("removeFromCart", action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totPrice = state.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      localStorage.setItem(CART_KEY, JSON.stringify(state));

    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totPrice = 0;
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    },
    checkout: (state) => {
      state.items = [];
      state.total = 0;
      state.totPrice = 0;
      localStorage.setItem(CART_KEY, JSON.stringify(state));
      alert("Thank you for your purchase!");
    },
    changeQuantity: (state, action: PayloadAction<any>) => {
      console.log("changeQuantity", action.payload);
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      state.total = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totPrice = state.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  checkout,
  changeQuantity,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
