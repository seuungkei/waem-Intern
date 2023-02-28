require('dotenv').config();

const { createApp } = require('./app');
const { mysqlDatabase } = require('./api/models/dbconfig');

const startServer = async () => {
  try {
    const PORT = process.env.PORT;
    const app = createApp();
    const server = require('http').createServer(app);

    await mysqlDatabase.initialize();
    console.log('Data Source has been inilialized!💡💡');

    server.listen(PORT, () => console.log(`server is listening on ${PORT}🔥🔥🔥🔥🔥🔥🔥 `));
  } catch (err) {
    console.error('Error during Data Source initialization', err);
    mysqlDatabase.destory();
  }
};

startServer();
