import express from 'express';
import {CategoryLocation, CategoryLocationWithoutId} from '../types';
import fileDB from '../fileDB';

const categoryRouter = express.Router();

categoryRouter.post('/', async (req, res) => {
  const {title, description} = req.body;

  if (!title) {
    return res.status(400).json({error: 'To create new category \'title\' field is required.'});
  }

  if (typeof (title) !== 'string') {
    return res.status(400).json({error: 'The type of \'title\' field must be a string'});
  } else if (title[0] === ' ') {
    return res.status(400).json({error: '\'title\' field can\'t begin with whitespace.'});
  }

  const objToBase: CategoryLocationWithoutId = {
    title,
    description: typeof (description) !== 'string'
      ? null
      : description[0] === ' ' || description === ''
        ? null
        : description
  };

  const result = await fileDB.addCategory(objToBase);
  return res.json(result);
});

categoryRouter.get('/', async (_req, res) => {
  const categoryList = await fileDB.getCategories();
  const result = categoryList.map((category) => {
    return {
      id: category.id,
      title: category.title
    };
  })

  return res.json(result);
});

categoryRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  const target = await fileDB.getCategoryById(id);

  if (!target) return res.status(404).json({error: 'There is no such category.'});

  return res.json(target);
});

categoryRouter.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const target = await fileDB.getCategoryById(id);
  const items = await fileDB.getItems();
  const relationExist = items.filter((item) => target?.id === item.categoryId);

  if (!target) res.status(400).json({error: 'There is no such category.'});
  if (relationExist.length > 0) return res.status(403).json({error: 'This category has a relation.'});

  await fileDB.deleteCategory(id);
  res.json({success: 'Category remove'});
});

categoryRouter.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {title, description} = req.body;
  const objToUpdate = await fileDB.getCategoryById(id);

  if (!objToUpdate) return res.status(404).json({error: 'There is no such category'});

  const objToBase: CategoryLocation = {
    ...objToUpdate,
    description: typeof (description) !== 'string'
      ? null
      : description[0] === ' ' || description === ''
        ? null
        : description
  };

  if (title) {
    if (typeof (title) !== 'string') {
      return res.status(400).json({error: 'title type must ba a string.'});
    } else if (title[0] !== ' ' && title !== '') {
      objToBase.title = title;
    }
  }

  await fileDB.updateCategory(id, objToBase);
  return res.json(objToBase);
});

export default categoryRouter;