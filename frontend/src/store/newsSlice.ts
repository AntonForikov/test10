import {CommentWithId, NewsWithId} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../app/store';
import {getComment, getNews, getNewsById, sendNews} from './newsThunk';

interface NewsState {
  newsById: NewsWithId | null,
  newsList: NewsWithId[],
  commentList: CommentWithId[],
  loading: boolean,
}

const initialState: NewsState = {
  newsById: null,
  newsList: [],
  commentList: [],
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
    }).addCase(getNews.fulfilled, (state, {payload: news}) => {
      state.loading = false;
      if (news) state.newsList = news;
    }).addCase(getNews.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getNewsById.pending, (state) => {
      state.loading = true;
    }).addCase(getNewsById.fulfilled, (state, {payload: news}) => {
      state.loading = false;
      if (news) state.newsById = news;
    }).addCase(getNewsById.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getComment.pending, (state) => {
      state.loading = true;
    }).addCase(getComment.fulfilled, (state, {payload: comments}) => {
      state.loading = false;
      state.commentList = [];
      if (comments) state.commentList = comments;
    }).addCase(getComment.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const newsReducer = newsSlice.reducer;
export const selectNewsList = (state: RootState) => state.news.newsList;
export const selectNewsById = (state: RootState) => state.news.newsById;
export const selectComments = (state: RootState) => state.news.commentList;
export const selectLoading = (state: RootState) => state.news.loading;