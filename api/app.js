import express from 'express';
import cors from 'cors';

import { getFileData, getFileList } from './controllers/fileController.js';

const app = express();

app.use(cors());

app.get('/files/data', getFileData);
app.get('/files/list', getFileList);

export default app;
