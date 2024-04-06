import {promises as fs} from 'fs';
import {CategoryLocation, CategoryLocationWithoutId, Item, ItemWithOutId} from './types';

const itemFilename = './items.json';
const categoryFilename = './categories.json';
const locationFilename = './locations.json';

let itemList: Item[] = [];
let categoryList: CategoryLocation[] = [];
let locationList: CategoryLocation[] = [];

const fileDB = {
  async initItems (){
    try {
      const fileContents = await fs.readFile(itemFilename);
      itemList = JSON.parse(fileContents.toString());
    } catch  {
      itemList = [];
    }
  },

  async getItems () {
    return itemList;
  },

  async getItemById (id: string) {
    return itemList.find(item => item.id === id);
  },

  async addItem (itemToAdd: ItemWithOutId) {
    const item: Item = {
      id: crypto.randomUUID(),
      ...itemToAdd,
    };

    itemList.push({...item});
    await this.saveItem();

    return item;
  },

  async saveItem () {
    await fs.writeFile(itemFilename, JSON.stringify(itemList, null, 2));
  },

  async deleteItem (id: string) {
    const items = await this.getItems();
    itemList = items.filter((item) => item.id !== id);
    await this.saveItem();
  },

  async updateItem (id: string, newItem: Item) {
    const items = await this.getItems();
    itemList = items.map((item) => {
      if (item.id === id) return {...newItem};
      return item;
    });
    await this.saveItem();
  },

  async initCategories (){
    try {
      const fileContents = await fs.readFile(categoryFilename);
      categoryList = JSON.parse(fileContents.toString());
    } catch  {
      categoryList = [];
    }
  },

  async getCategories () {
    return categoryList;
  },

  async getCategoryById (id: string) {
    return categoryList.find(category => category.id === id);
  },

  async addCategory (categoryToAdd: CategoryLocationWithoutId) {
    const category: CategoryLocation = {
      id: crypto.randomUUID(),
      ...categoryToAdd,
    };

    categoryList.push({...category});
    await this.saveCategory();

    return category;
  },

  async saveCategory () {
    await fs.writeFile(categoryFilename, JSON.stringify(categoryList, null, 2));
  },

  async deleteCategory (id: string) {
    const categories = await this.getCategories();
    categoryList = categories.filter((category) => category.id !== id);
    await this.saveCategory();
  },

  async updateCategory (id: string, newCategory: CategoryLocation) {
    const categories = await this.getCategories();
    categoryList = categories.map((category) => {
      if (category.id === id) return {...newCategory};
      return category;
    });
    await this.saveCategory();
  },

  async initLocations (){
    try {
      const fileContents = await fs.readFile(locationFilename);
      locationList = JSON.parse(fileContents.toString());
    } catch  {
      locationList = [];
    }
  },

  async getLocations () {
    return locationList;
  },

  async getLocationById (id: string) {
    return locationList.find(category => category.id === id);
  },

  async addLocation (locationToAdd: CategoryLocationWithoutId) {
    const location: CategoryLocation = {
      id: crypto.randomUUID(),
      ...locationToAdd,
    };

    locationList.push({...location});
    await this.saveLocation();

    return location;
  },

  async saveLocation () {
    await fs.writeFile(locationFilename, JSON.stringify(locationList, null, 2));
  },

  async deleteLocation (id: string) {
    const locations = await this.getLocations();
    locationList = locations.filter((location) => location.id !== id);
    await this.saveLocation();
  },

  async updateLocation (id: string, newLocation: CategoryLocation) {
    const locations = await this.getLocations();
    locationList = locations.map((location) => {
      if (location.id === id) return {...newLocation};
      return location;
    });
    await this.saveLocation();
  },
};

export default fileDB;