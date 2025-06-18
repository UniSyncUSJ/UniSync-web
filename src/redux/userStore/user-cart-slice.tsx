import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string; // optional property for item image
  // add other properties as needed
  category?: string; // optional property for item category
};

type UserCartState = {
  cart: CartItem[];
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
};

const userCartInitialState: UserCartState = {
  cart: [],
  totalAmount: 0,
  isLoading: false,
  error: null,
};

const userCartSlice = createSlice({
  name: "userCart",
  initialState: userCartInitialState,
  reducers: {
    addItemsToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cart.push(newItem);
      }

      state.totalAmount += newItem.price * newItem.quantity;
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex >= 0) {
        const existingItem = state.cart[existingItemIndex];
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cart.splice(existingItemIndex, 1);
      }
    },
    addItemQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.cart.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += existingItem.price;
      }
    },
    removeItemQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.cart.find((item) => item.id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalAmount -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== itemId);
        state.totalAmount -= existingItem.price;
      }
    },
  },
});

export const userCartActions = userCartSlice.actions;
export default userCartSlice;
