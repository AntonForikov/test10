import express from 'express';
// import {CategoryLocation, CategoryLocationWithoutId} from '../types';
import fileDB from '../fileDB';
import {CommentWithoutId} from '../types';

const commentRouter = express.Router();

commentRouter.post('/', async (req, res) => {
  const {text, newsId, author} = req.body;

  if (!text || !newsId) {
    return res.status(400).json({error: 'To create new comment "text" and "newsId" fields are required.'});
  }

  if (typeof (text) !== 'string') {
    return res.status(400).json({error: 'The type of "text" field must be a string'});
  } else if (text[0] === ' ') {
    return res.status(400).json({error: "'text' field can't begin with whitespace."});
  }

  if (typeof (newsId) !== 'string') {
    return res.status(400).json({error: 'The type of "newsId" field must be a string'});
  } else if (newsId[0] === ' ') {
    return res.status(400).json({error: "'newsId' field can't begin with whitespace."});
  }

  const objToBase: CommentWithoutId = {
    text,
    newsId,
    author: !author ? 'anonymous'
      : author[0] === ' ' || author === '' ? 'anonymous' : author
  };

  const result = await fileDB.addComment(objToBase);
  return res.json(result);
});

commentRouter.get('/', async (req, res) => {
  const {news_id} = req.query;
  const commentList = await fileDB.getComments();
  if (news_id) {
    const commentsWithQuery = commentList.filter((comment) => comment.newsId === news_id);
    if (commentsWithQuery.length > 0) return res.json(commentsWithQuery);
    if (commentsWithQuery.length === 0) return res.status(400).json({error: 'There are no comments with this news_id'});
    console.log(commentsWithQuery)
  }

  return res.json(commentList);
});


commentRouter.delete('/:id', async (req, res) => {
  const {id} = req.params;
  // const target = await fileDB.getCategoryById(id);
  // const items = await fileDB.getItems();
  // const relationExist = items.filter((item) => target?.id === item.categoryId);
  //
  // if (!target) res.status(400).json({error: 'There is no such category.'});
  // if (relationExist.length > 0) return res.status(403).json({error: 'This category has a relation.'});

  await fileDB.deleteComment(id);
  res.json({success: 'Comment remove'});
});

export default commentRouter;