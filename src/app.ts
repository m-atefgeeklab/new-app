import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment';
import webhookRoutes from './routes/webhook';
import { syncDB } from './utils/db';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/payment', paymentRoutes);
app.use('/webhook', webhookRoutes);

syncDB();

export default app;
