import { createSlice } from '@reduxjs/toolkit';
import { setLogout } from '../../utils/localStorage/token';
import { setCart } from './cartSlice';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
    },
    logout: (state) => {
      state.user = null;
      setLogout();
      setCart(null);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
