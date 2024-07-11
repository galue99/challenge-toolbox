import dotenv from 'dotenv';
import chai from 'chai';
import chaiHttp from 'chai-http';

dotenv.config();

chai.use(chaiHttp);

export { chai };
