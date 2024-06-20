import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import router from './routes/routes.js';


const app = express();
const port = 3001;

app.get('/ex', (req, res) => {
    res.send('Hello World');
});


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});