import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/CartSlice';
import cartUISlice from './slices/CartUISlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        cartUI: cartUISlice,
    },

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export default store;