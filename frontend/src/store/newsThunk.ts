import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {News, NewsWithId} from '../types';

export const sendNews = createAsyncThunk(
  'sendNews/post',
  async (news: News) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(news) as (keyof News)[];

      keys.forEach(key => {
        const value = news[key];
        if (value !== null) formData.append(key, value);
      });

      await axiosApi.post<NewsWithId | undefined>('/news', formData);
    } catch (e) {
      console.error(e);
    }
  }
);
export const getNews = createAsyncThunk(
  'getNews/get',
  async () => {
    try {
      const {data} = await axiosApi.get<NewsWithId[] | undefined>('/news');
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