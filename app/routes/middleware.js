'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { raw, json, urlencoded } from 'express';
import multer from 'multer';
//import cookieParser from 'cookie-parser';

export default app => {
  if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(helmet());
  }
  app.use(bodyParser.json({limit: '50000'}));
  app.use(bodyParser.urlencoded({limit: '50000', extended: true, parameterLimit:100000}));
  app.use(express.json());

  // app.use(express.json({limit:'50mb', extended: true}));
  // app.use(express.urlencoded({limit:'50mb', extended: true, parameterLimit:100000 }));
  //app.use(urlencoded({limit:'50mb', extended: true, parameterLimit:50000 })); 
  
  //app.use(cookieParser());
  app.use(cors());
  //app.use(raw());
  

  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} >> ${req.get('HOST')}${req.originalUrl}`);
      if (req.body)
        console.log('========Request body==========\n', req.body);
      if (req.params)
        console.log('========Request params==========\n', req.params);
      if (req.query)
        console.log('========Request query string==========\n', req.query);
      if (req.headers.authorization)
        console.log('====Auth token====\n', req.headers.authorization);

      next();
    });
  }
};
const storage = multer.memoryStorage();
export const multerUploads = multer({ storage });