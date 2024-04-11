const mongoose = require('mongoose');

module.exports = async () => {
  const string = process.env.DB_CONNECTION.replace(
    '<password>',
    process.env.DB_PASSWORD
  );

  await mongoose.connect(string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log('Mongo connected! 🦊');
};
