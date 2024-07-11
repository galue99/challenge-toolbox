import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import csvParser from 'csv-parser';

const API_KEY = process.env.API_KEY || 'Bearer aSuperSecretKey';
const API_URL = process.env.API_URL || 'https://echo-serv.tbxnet.com/v1/secret/';

export const fetchFileList = async () => {
  const response = await axios.get(`${API_URL}/files`, {
    headers: { authorization: API_KEY },
  });
  return response.data;
};

export const fetchFileContent = async (file) => {
  try {
    const response = await axios.get(`${API_URL}file/${file}`, {
      headers: { authorization: API_KEY },
      responseType: 'stream',
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching file content for ${file}:`, error.message);
    return null;
  }
};

export const parseCSVStream = (stream) => {
  return new Promise((resolve, reject) => {
    const lines = [];
    stream
      .pipe(csvParser())
      .on('data', (row) => {
        if (row.file && row.text && row.number && row.hex) {
          lines.push({
            text: row.text,
            number: row.number,
            hex: row.hex,
          });
        }
      })
      .on('end', () => {
        resolve(lines);
      })
      .on('error', reject);
  });
};
