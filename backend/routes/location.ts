import express from 'express';
import {CategoryLocation, CategoryLocationWithoutId} from '../types';
import fileDB from '../fileDB';

const locationRouter = express.Router();

locationRouter.post('/', async (req,res) => {
  const {title, description} = req.body;

  if (!title) {
    return res.status(400).json({error: "To create new location 'title' field is required."});
  }

  if (typeof(title) !== 'string') {
    return res.status(400).json({error: "The type of 'title' field must be a string"});
  } else if (title[0] === ' ') {
    return res.status(400).json({error: "'title' field can't begin from whitespace."});
  }

  const objToBase: CategoryLocationWithoutId = {
    title,
    description: typeof (description) !== 'string'
      ? null
      : description[0] === ' ' || description === ''
        ? null
        : description
  };

  const result = await fileDB.addLocation(objToBase);
  return res.json(result);
});

locationRouter.get('/', async (_req, res) => {
  const categoryList = await fileDB.getLocations();
  const result = categoryList.map((category) => {
    return {
      id: category.id,
      title: category.title
    };
  })

  return res.json(result);
});

locationRouter.get('/:id', async (req,res) => {
  const {id} = req.params;
  const target = await fileDB.getLocationById(id);

  if (!target) return res.status(404).json({error: 'There is no such location.'});

  return res.json(target);
});

locationRouter.delete('/:id', async (req,res) => {
  const {id} = req.params;
  const target = await fileDB.getLocationById(id);
  const items = await fileDB.getItems();
  const relationExist = items.filter((item) => target?.id === item.locationId);

  if (!target) res.status(400).json({error: 'There is no such location.'});
  if (relationExist.length > 0) return res.status(403).json({error: 'This location has a relation.'});

  await fileDB.deleteLocation(id);
  res.json({success: 'Location remove'});
});

locationRouter.put('/:id', async (req,res) => {
  const {id} = req.params;
  const {title, description} = req.body;
  const objToUpdate = await fileDB.getLocationById(id);

  if (!objToUpdate) return res.status(404).json({error: 'There is no such location'});

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

  await fileDB.updateLocation(id, objToBase);
  return res.json(objToBase);
});

export default locationRouter;