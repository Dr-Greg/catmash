const axios = require('axios');
const mongoose = require('mongoose');

const Cat = require('../src/models/Cat');
const CONFIG = require('../src/config');

mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

const dropAllCollections = () => {
  const collections = Object.keys(mongoose.connection.collections);
  collections.forEach(async (collectionName) => {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') return;
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  });
};

const catsToDb = async () => {
  const { data } = await axios.get('https://latelier.co/data/cats.json');
  const catsInDb = await Cat.find();

  if (catsInDb && catsInDb.length === 100) return null;

  if (data && data.images && data.images.length === 100) {
    data.images.forEach((image) => {
      const cat = new Cat({
        id: image.id,
        url: image.url,
        score: 1000,
      });
      cat.save();
    });
  }

  return null;
};

const getCatId = async () => {
  const cat = await Cat.findOne();
  return cat._id;
};

module.exports = {
  setupDB() {
    beforeAll(async () => {
      const uri = `mongodb://127.0.0.1/${CONFIG.DB_NAME}_test`;
      await mongoose.connect(uri, { useNewUrlParser: true });
      await catsToDb();
    });

    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
  getCatId,
};
