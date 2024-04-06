import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Message, MessageWithIdAndImage} from '../types';

export const sendMessage = createAsyncThunk(
  'sendMessages/post',
  async (message: Message) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(message) as (keyof Message)[];

      keys.forEach(key => {
        const value = message[key];
        if (value !== null) formData.append(key, value);
      });

      await axiosApi.post<MessageWithIdAndImage | undefined>('/messages', formData);
    } catch (e) {
      console.error(e);
    }
  }
);
export const getMessages = createAsyncThunk(
  'getMessages/get',
  async () => {
    try {
      const {data} = await axiosApi.get<MessageWithIdAndImage[] | undefined>('/messages');
      if (data) {
        return data.reverse();
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
    }
  }
);