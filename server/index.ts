import express, {Application} from 'express';
import cors from 'cors';
import Routes from './routes';

export default class Server {
  constructor(app: Application){
    this.config(app);
    new Routes(app);
  }

  private config(app: Application){
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
  }
}