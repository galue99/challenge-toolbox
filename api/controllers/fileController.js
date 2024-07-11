import { fetchFileList, fetchFileContent, parseCSVStream } from '../services/fileService.js';

export const getFileData = async (req, res) => {
  try {
    const { fileName } = req.query;
    const { files } = await fetchFileList();

    const filteredFiles = fileName ? files.filter(file => file === fileName) : files;

    const fileDataPromises = filteredFiles.map(async (file) => {
      const fileContentStream = await fetchFileContent(file);

      if (!fileContentStream) return null;
      const lines = await parseCSVStream(fileContentStream);
      return { file, lines };
    });

    const fileData = (await Promise.all(fileDataPromises)).filter(Boolean);
    res.json(fileData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export const getFileList = async (req, res) => {
  try {
    const files = await fetchFileList();
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files list' });
  }
};
