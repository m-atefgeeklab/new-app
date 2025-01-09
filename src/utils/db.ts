import { Sequelize } from 'sequelize';
import Payment from '../models/Payment';

const sequelize = new Sequelize(process.env.DATABASE_URL!);

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    await Payment.sync({ alter: true });
    console.log('Payment table synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, syncDB };
