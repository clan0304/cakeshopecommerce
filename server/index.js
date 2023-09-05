import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProduct, updateProduct } from './controllers/product.js';
import ProductRouter from './routes/product.js';
import UserRouter from './routes/user.js';
import Stripe from 'stripe';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'Images')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use('/auth', UserRouter);
app.use('/product', ProductRouter);
app.post('/product', upload.single('picture'), createProduct);
app.put('/product/:id', upload.single('picture'), updateProduct);
app.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: 'aud',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.count,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['AU'],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout-success',
    cancel_url: 'http://localhost:3000/',
  });
  res.send({ url: session.url });
});

const PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER IS CONNECTED TO PORT ${PORT}!`));
  })
  .catch((err) => console.log(err));
