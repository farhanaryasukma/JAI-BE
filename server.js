const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const {Product, User, UserProduct} = require('./models')

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
      // Find the user based on userId
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Associate the order with the products
      for (const orderItem of orderItems) {
        const product = await Product.findByPk(orderItem.productId);
  
        if (!product) {
          return res.status(404).json({ message: `Product not found with ID ${orderItem.productId}` });
        }
  
        await UserProduct.create({
          userId: user.id,
          productId: product.id,
          quantity: orderItem.quantity,
        });
      }
  
      // Return a success response
      res.status(201).json({ message: 'Order submitted successfully!' });
    } catch (error) {
      console.error('Error submitting order:', error);
      // Return an error response
      res.status(500).json({ message: 'Error submitting order. Please try again later.' });
    }
  });

  app.get('/orders/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const orders = await UserProduct.findAll({
        where: { userId },
      });
  
      // Return the order data as a response
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
