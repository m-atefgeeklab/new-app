import { Sequelize, DataTypes, Model } from 'sequelize';
import { IPayment } from './IPayment';

const sequelize = new Sequelize(process.env.DATABASE_URL!);

class Payment extends Model<IPayment> implements IPayment {
  public id!: number;
  public paymentId!: string;
  public status!: string;
  public amount!: number;
  public currency!: string;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
  }
);

export default Payment;
