import {promises as fs} from 'fs';
import {Comment, CommentWithoutId, News, NewsWithOutId} from './types';

const newsFilename = './news.json';
const commentsFilename = './comments.json';

let newsList: News[] = [];
let commentList: Comment[] = [];

const fileDB = {
  async initNews (){
    try {
      const fileContents = await fs.readFile(newsFilename);
      newsList = JSON.parse(fileContents.toString());
    } catch  {
      newsList = [];
    }
  },

  async getNews () {
    return newsList;
  },

  async getNewsById (id: string) {
    return newsList.find(news => news.id === id);
  },

  async addNews (itemToAdd: NewsWithOutId) {
    const news: News = {
      id: crypto.randomUUID(),
      ...itemToAdd,
    };

    newsList.push({...news});
    await this.saveNews();

    return news;
  },

  async saveNews () {
    await fs.writeFile(newsFilename, JSON.stringify(newsList, null, 2));
  },

  async deleteNews (id: string) {
    const news = await this.getNews();
    const comments = await this.getComments();
    commentList = comments.filter((comment) => comment.newsId !== id);
    newsList = news.filter((news) => news.id !== id);
    await this.saveComment();
    await this.saveNews();
  },

  async initComments (){
    try {
      const fileContents = await fs.readFile(commentsFilename);
      commentList = JSON.parse(fileContents.toString());
    } catch  {
      commentList = [];
    }
  },

  async getComments () {
    return commentList;
  },

  // async getCategoryById (id: string) {
  //   return commentList.find(category => category.id === id);
  // },

  async addComment (commentToAdd: CommentWithoutId) {
    const comment: Comment = {
      id: crypto.randomUUID(),
      ...commentToAdd,
    };

    commentList.push({...comment});
    await this.saveComment();

    return comment;
  },

  async saveComment () {
    await fs.writeFile(commentsFilename, JSON.stringify(commentList, null, 2));
  },

  async deleteComment (id: string) {
    const comments = await this.getComments();
    commentList = comments.filter((comment) => comment.id !== id);
    await this.saveComment();
  },
};

export default fileDB;