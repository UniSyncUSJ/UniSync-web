import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
  selectedCategory: string;
}

const initialState: SearchState = {
  searchTerm: "",
  selectedCategory: "all",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const userSearchActions = searchSlice.actions;
export default searchSlice;
