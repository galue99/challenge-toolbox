import { chai } from '../setup.js';  // Importar chai desde setup.js
import { expect } from 'chai';
import app from '../app.js';

describe('API Endpoints', () => {
  describe('GET /files/list', () => {
    it('should fetch the list of files', async () => {
      const res = await chai.request(app).get('/files/list');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('files');
      expect(res.body.files.files).to.be.an('array');
    });
  });

  describe('GET /files/data', () => {
    it('should fetch the data of files', async () => {
      const res = await chai.request(app).get('/files/data');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach(file => {
        expect(file).to.have.property('file');
        expect(file).to.have.property('lines');
        expect(file.lines).to.be.an('array');
        file.lines.forEach(line => {
          expect(line).to.have.property('text');
          expect(line).to.have.property('number');
          expect(line).to.have.property('hex');
        });
      });
    });
  });
});
