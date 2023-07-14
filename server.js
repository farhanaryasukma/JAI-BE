const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const {Product} = require('./models')

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Login route
app.get('/product', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.post('/orders', async (req, res) => {
    const { userId, orderItems } = req.body;
  
    try {
      // Create the UserProduct records for each ordered item
      const createdOrders = await UserProduct.bulkCreate(
        orderItems.map((item) => ({
          userId,
          productId: item.productId,
          quantity: item.quantity
        }))
      );
  
      res.status(201).json({ message: 'Order submitted successfully', orders: createdOrders });
    } catch (error) {
      console.error('Error submitting order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
