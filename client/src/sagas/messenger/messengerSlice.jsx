import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  currentChat: [],
  messages: [],
  loading: false,
  error: null,
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    createConversationsRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    conversationsRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    conversationsSuccess: (state, action) => {
      return {
        ...state,
        conversations: action.payload,
        loading: false,
        error: null,
      };
    },
    currentChatRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    currentChatSuccess: (state, action) => {
      return {
        ...state,
        currentChat: action.payload,
        loading: false,
        error: null,
      };
    },
    createMessagesRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    messagesRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    messagesSuccess: (state, action) => {
      return {
        ...state,
        messages: action.payload,
        loading: false,
        error: null,
      };
    },
    setLoadingMessage: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const {
  setLoadingMessage,
  conversationsRequest,
  conversationsSuccess,
  currentChatRequest,
  currentChatSuccess,
  messagesRequest,
  messagesSuccess,
  createConversationsRequest,
  createMessagesRequest,
} = messengerSlice.actions;
export default messengerSlice.reducer;
