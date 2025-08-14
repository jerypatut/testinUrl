import express from 'express';
import urlRoutes from './routes/url.routes';
import { notFoundHandler } from './middlewares/notFound';
const app = express();


app.use(express.json());
app.use('/', urlRoutes);

app.use(notFoundHandler);
export default app;
