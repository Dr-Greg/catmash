const mongoose = require('mongoose');

const db = {
  connect: async (uri, name) => {
    try {
      return await mongoose.connect(
        uri,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          dbName: name,
        },
        (error) => {
          if (error) {
            console.error(error);
            return error;
          }
          console.log(`Connected to ${name} db.`);
          return null;
        }
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

module.exports = db;
