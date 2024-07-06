import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from '../features/orderBook/orderBookSlice';

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },
});