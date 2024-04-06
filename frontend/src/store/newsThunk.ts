import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {News, NewsWithId, Comment, CommentWithId} from '../types';

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

export const getNewsById = createAsyncThunk(
  'getNews/getById',
  async (id: string) => {
    try {
      const {data} = await axiosApi.get<NewsWithId | undefined>(`/news/${id}`);
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteNews = createAsyncThunk(
  'deleteNews/delete',
  async (id: string) => {
    try {
      await axiosApi.delete(`/news/${id}`);
    } catch (e) {
      console.error(e);
    }
  }
);

export const sendComment = createAsyncThunk(
  'sendComment/post',
  async (comment: Comment) => {
    try {
      await axiosApi.post<CommentWithId | undefined>('/comments', comment);
    } catch (e) {
      console.error(e);
    }
  }
);

export const getComment = createAsyncThunk(
  'getComment/get',
  async (id: string) => {
    try {
      const {data} =  await axiosApi.get<CommentWithId[] | undefined>(`/comments?news_id=${id}`);
      if (data) {
        return data
      } else {
        return null
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'deleteComment/delete',
  async (id: string) => {
    try {
      await axiosApi.delete(`/comments/${id}`);
    } catch (e) {
      console.error(e);
    }
  }
);