import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { User } from '../models/User';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id)
      .select('-password')
      .populate('savedBlends')
      .populate('orders')
      .populate('subscriptionPlan');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, phone, address },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's saved blends
router.get('/saved-blends', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id)
      .select('savedBlends')
      .populate('savedBlends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedBlends);
  } catch (error) {
    console.error('Error fetching saved blends:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id)
      .select('orders')
      .populate({
        path: 'orders',
        populate: {
          path: 'items.product',
        },
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's payment methods
router.get('/payment-methods', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select('paymentMethods');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.paymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's notifications
router.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select('notifications');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 