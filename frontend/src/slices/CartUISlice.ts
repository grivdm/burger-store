import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartUIState {
    isOpen: boolean;
}

const initialState: CartUIState = {
    isOpen: false,
};

export const cartUISlice = createSlice({
    name: "cartUI",
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggleCart } = cartUISlice.actions;

export const selectCartUI = (state: any) => state.cartUI;

export default cartUISlice.reducer;
