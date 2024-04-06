import express from 'express';
import cors from 'cors';

import fileDB from './fileDB';
import commentRouter from './routes/coments';
import newsRouter from './routes/news';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(express.static('public'));
app.use('/comments', commentRouter);
app.use('/news', newsRouter);

const run = async () => {
  await fileDB.initNews();
  await fileDB.initComments();

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });
};

void run();