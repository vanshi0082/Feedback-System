import express from 'express';
import Feedback from '../models/Feedback.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/feedback - Create new feedback (authenticated users)
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      name: name.trim(),
      email: email ? email.trim() : '',
      message: message.trim(),
      rating: parseInt(rating),
      userId: req.user.userId,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// GET /api/feedback - Get all feedback (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// GET /api/feedback/my - Get user's own feedback
router.get('/my', authenticate, async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// GET /api/feedback/stats - Get analytics (admin only)
router.get('/stats', authenticate, isAdmin, async (req, res) => {
  try {
    const total = await Feedback.countDocuments();
    const feedbacks = await Feedback.find();

    if (total === 0) {
      return res.json({
        total: 0,
        averageRating: 0,
        positive: 0,
        negative: 0,
      });
    }

    const averageRating =
      feedbacks.reduce((sum, f) => sum + f.rating, 0) / total;
    const positive = feedbacks.filter((f) => f.rating >= 4).length;
    const negative = feedbacks.filter((f) => f.rating <= 2).length;

    res.json({
      total,
      averageRating: parseFloat(averageRating.toFixed(2)),
      positive,
      negative,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;

