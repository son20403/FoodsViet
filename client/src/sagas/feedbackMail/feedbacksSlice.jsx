import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedback: [],
  feedbackDetail: {},
  loading: false,
  error: null,
};

const feedbacksSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    FeedbackRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getFeedbackSuccess: (state, action) => {
      return {
        ...state,
        feedback: action.payload,
        error: null,
        loading: false,
      };
    },
    createFeedbacksRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    createFeedbacksSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    sendFeedbacksRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    sendFeedbacksSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    feedbackDetailRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    feedbackDetailAdminSuccess: (state, action) => {
      return {
        ...state,
        feedbackDetail: action.payload,
        loading: false,
        error: null,
      };
    },
    forgetPasswordRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    forgetPasswordSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    resetPasswordRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    resetPasswordSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
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
export const {
  FeedbackRequest,
  getFeedbackSuccess,
  requestFailure,
  createFeedbacksRequest,
  createFeedbacksSuccess,
  feedbackDetailAdminSuccess,
  feedbackDetailRequest,
  sendFeedbacksRequest,
  sendFeedbacksSuccess,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  resetPasswordRequest,
  resetPasswordSuccess,
} = feedbacksSlice.actions;
export default feedbacksSlice.reducer;
