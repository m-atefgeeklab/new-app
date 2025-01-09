import express from 'express';
import paypal from '../utils/paypal';
import Payment from '../models/Payment';
import { IPayment } from '../models/IPayment';

const router = express.Router();

router.post('/pay', async (req, res) => {
  const { amount, currency } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [
      {
        amount: {
          total: amount,
          currency: currency,
        },
      },
    ],
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
  };

  paypal.payment.create(create_payment_json, async (error, payment) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      await Payment.create({
        paymentId: payment.id,
        status: 'created',
        amount: amount,
        currency: currency,
      } as IPayment);

      const redirectUrl = payment.links ? payment.links[1].href : null;
      res.json({ paymentId: payment.id, redirectUrl });
    }
  });
});

router.get('/success', async (req, res) => {
  const { paymentId, PayerID } = req.query;

  paypal.payment.execute(paymentId as string, { payer_id: PayerID as string }, async (error, payment) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      await Payment.update({ status: 'completed' }, { where: { paymentId: payment.id } });
      res.send('Payment successful!');
    }
  });
});

router.get('/cancel', (req, res) => {
  res.send('Payment cancelled!');
});

export default router;
