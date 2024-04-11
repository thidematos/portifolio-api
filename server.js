const app = require('./app');
const dotenv = require('dotenv');
const connectionDB = require('./utils/connectDB');

dotenv.config({ path: './config.env' });

app.listen(process.env.PORT || 3000, async () => {
  console.log('Server started!');
  await connectionDB();
});
