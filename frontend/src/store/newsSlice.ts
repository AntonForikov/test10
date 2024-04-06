import {NewsWithId} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {getNews, sendNews} from './newsThunk';

interface NewsState {
  newsList: NewsWithId[],
  loading: boolean,
}

const initialState: NewsState = {
  newsList: [],
  loading: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendNews.pending, (state) => {
      state.loading = true;
    }).addCase(sendNews.fulfilled, (state) => {
      state.loading = false;
    }).addCase(sendNews.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
    }).addCase(getNews.fulfilled, (state, {payload: messages}) => {
      state.loading = false;
      if (messages) state.newsList = messages;
    }).addCase(getNews.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;
export const selectNewsList = (state: RootState) => state.news.newsList;
export const selectLoading = (state: RootState) => state.news.loading;