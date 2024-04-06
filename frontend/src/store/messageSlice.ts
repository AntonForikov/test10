import {MessageWithIdAndImage} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {getMessages, sendMessage} from './messageThunk';

interface MessageState {
  messageList: MessageWithIdAndImage[],
  loading: boolean,
}

const initialState: MessageState = {
  messageList: [],
  loading: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
    }).addCase(sendMessage.fulfilled, (state) => {
      state.loading = false;
    }).addCase(sendMessage.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
    }).addCase(getMessages.fulfilled, (state, {payload: messages}) => {
      state.loading = false;
      if (messages) state.messageList = messages;
    }).addCase(getMessages.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const messageReducer = messageSlice.reducer;
export const selectMessageList = (state: RootState) => state.message.messageList;
export const selectLoading = (state: RootState) => state.message.loading;