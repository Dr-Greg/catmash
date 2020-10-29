const axios = require('axios');

const Cat = require('../models/Cat');

module.exports = async () => {
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
