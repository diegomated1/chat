// IMPORTS 
import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// controladores


// Midlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Routes
import routes from './routes/routes.js';

app.use('/', routes.LogRouter);
app.use('/usuario', routes.UsuarioRouter);
app.use('/servidor', routes.ServidorRouter);
app.use('/servidor', routes.CanalRouter);
app.use('/servidor', routes.MensajeRouter);

// Listen
app.listen(8080, ()=>{
    console.log(`Server on port 8080`);
});
