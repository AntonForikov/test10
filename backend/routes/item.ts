import express from 'express';
import fileDB from '../fileDB';
import {imagesUpload} from '../multer';
import {Item, ItemWithOutId} from '../types';

const itemRouter = express.Router();

itemRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const {categoryId, locationId, name, description} = req.body;

  if (!categoryId || !locationId || !name) {
    return res.status(400).json({error: 'categoryId, locationId, name required for this request and can not be an empty string'});
  }

  if (typeof (categoryId) !== 'string') {
    return res.status(400).json({error: 'categoryId type must ba a string.'});
  } else if (categoryId[0] === ' ') {
    return res.status(400).json({error: 'categoryId can not begin from whitespace.'});
  }

  if (typeof (locationId) !== 'string') {
    return res.status(400).json({error: 'locationId type must ba a string.'});
  } else if (locationId[0] === ' ') {
    return res.status(400).json({error: 'locationId can not begin from whitespace.'});
  }

  if (typeof (name) !== 'string') {
    return res.status(400).json({error: 'name type must ba a string.'});
  } else if (name[0] === ' ') {
    return res.status(400).json({error: 'name can not begin from whitespace.'});
  }

  const objToBase: ItemWithOutId = {
    categoryId,
    locationId,
    name,
    description: description && typeof (description) !== 'string'
      ? description[0] === ' ' || description === ''
        ? null
        : description
      : null,
    image: req.file ? req.file.filename : null
  };
  const result = await fileDB.addItem(objToBase);
  return res.json(result);
});

itemRouter.get('/', async (_req, res) => {
  const itemList = await fileDB.getItems();
  const result = itemList.map((item) => {
    return {
      id: item.id,
      categoryId: item.categoryId,
      locationId: item.locationId,
      name: item.name
    };
  });
  return res.json(result);
});

itemRouter.get('/:id', async (req,res) => {
  const {id} = req.params;
  const target = await fileDB.getItemById(id);

  if (!target) return res.status(404).json({error: 'There is no such item.'});

  return res.json(target)
});

itemRouter.delete('/:id', async (req,res) => {
  const {id} = req.params;
  const target = await fileDB.getItemById(id);

  if (!target) return res.status(404).json({error: 'There is no such item.'});

  await fileDB.deleteItem(id);
  return res.json({success: 'Item deleted.'});
});

itemRouter.put('/:id', imagesUpload.single('image'), async (req,res) => {
  const {id} = req.params;
  const {categoryId, locationId, name, description} = req.body;
  const objToUpdate = await fileDB.getItemById(id);

  if (!objToUpdate) return res.status(404).json({error: 'There is no such item'})

  const objToBase: Item = {
    ...objToUpdate,
    description: description && typeof (description) === 'string'
      ? description[0] === ' ' || description === ''
        ? null
        : description
      : null,
    image: req.file ? req.file.filename : null
  };

  if (categoryId) {
    if (typeof (categoryId) !== 'string') {
      return res.status(400).json({error: 'categoryId type must ba a string.'});
    } else if (categoryId[0] !== ' ' && categoryId !== '') {
      objToBase.categoryId = categoryId;
    }
  }

  if (locationId) {
    if (typeof (locationId) !== 'string') {
      return res.status(400).json({error: 'locationId type must ba a string.'});
    } else if (locationId[0] !== ' ' && locationId !== '') {
      objToBase.locationId = locationId;
    }
  }

  if (name) {
    if (typeof (name) !== 'string') {
      return res.status(400).json({error: 'name type must ba a string.'});
    } else if (name[0] !== ' ' && name !== '') {
      objToBase.name = name;
    }
  }

  await fileDB.updateItem(id, objToBase);
  return res.json(objToBase);
});
export default itemRouter;