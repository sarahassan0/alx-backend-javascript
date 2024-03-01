const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

app.get('/cart/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    return res.sendStatus(404);
  }
  res.status(200).send(`Payment methods for cart ${req.params.id}`);
});

app.get('/available_payments', (req, res) => {
  return res.status(200).json({
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  });
});

app.post('/login', (req, res) => {
  return res.status(200).send(`Welcome ${req.body.userName}`);
});

app.listen(7865, () => {
  console.log('API available on localhost port 7865');
});
