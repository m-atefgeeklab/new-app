import express from 'express';
import Payment from '../models/Payment';

const router = express.Router();

router.post('/webhook', async (req, res) => {
  const event = req.body;

  if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    const paymentId = event.resource.id;
    await Payment.update({ status: 'completed' }, { where: { paymentId } });
  }

  res.status(200).end();
});

export default router;
