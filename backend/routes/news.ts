import express from 'express';
import fileDB from '../fileDB';
import {imagesUpload} from '../multer';
import {NewsWithOutId} from '../types';

const newsRouter = express.Router();

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const {title, content} = req.body;

  if (!title || !content) {
    return res.status(400).json({error: 'title and content required for this request and can not be an empty string'});
  }

  if (typeof (title) !== 'string') {
    return res.status(400).json({error: 'title type must ba a string.'});
  } else if (title[0] === ' ') {
    return res.status(400).json({error: 'title can not begin from whitespace.'});
  }

  if (typeof (content) !== 'string') {
    return res.status(400).json({error: 'content type must ba a string.'});
  } else if (content[0] === ' ') {
    return res.status(400).json({error: 'content can not begin from whitespace.'});
  }

  const objToBase: NewsWithOutId = {
    title,
    content,
    date: new Date(),
    image: req.file ? req.file.filename : null
  };
  const result = await fileDB.addNews(objToBase);
  return res.json(result);
});

newsRouter.get('/', async (_req, res) => {
  const newsList = await fileDB.getNews();
  const result = newsList.map((news) => {
    return {
      id: news.id,
      title: news.title,
      date: news.date,
      image: news.image
    };
  });
  return res.json(result);
});

newsRouter.get('/:id', async (req,res) => {
  const {id} = req.params;
  const target = await fileDB.getNewsById(id);

  if (!target) return res.status(404).json({error: 'There is no such news.'});

  return res.json(target)
});

newsRouter.delete('/:id', async (req,res) => {
  const {id} = req.params;
  const target = await fileDB.getNewsById(id);

  if (!target) return res.status(404).json({error: 'There is no such news.'});

  await fileDB.deleteNews(id);
  return res.json({success: 'News deleted.'});
});

export default newsRouter;