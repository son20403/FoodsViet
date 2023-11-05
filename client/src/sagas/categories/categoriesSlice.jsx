import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getCategoriesSuccess: (state, action) => {
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    },
    requestFailure: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
  },
});

export const { getCategoriesSuccess, categoriesRequest, requestFailure } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
