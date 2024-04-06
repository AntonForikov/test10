import express from 'express';
import cors from 'cors';
import messageRouter from './routes/messages';
import fileDB from './fileDB';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(express.static('public'));
app.use('/messages', messageRouter);

const run = async () => {
  await fileDB.initItems();

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });
};

void run();