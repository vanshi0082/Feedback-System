import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { createFeedback } from '../lib/api';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function FeedbackForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Message is required');
      return;
    }

    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      await createFeedback(formData);
      toast.success('Feedback submitted successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 0,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Submit Feedback
          </CardTitle>
          <CardDescription className="text-base mt-2">Share your thoughts and help us improve</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email (optional)"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="rating" className="text-base">
              Rating <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2 sm:gap-3 items-center justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0], y: -5 }}
                  whileTap={{ scale: 0.85 }}
                  className="relative group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaStar
                    className={`relative text-4xl sm:text-5xl transition-all duration-300 ${
                      star <= (hoveredRating || formData.rating)
                        ? 'text-purple-600 dark:text-purple-400 drop-shadow-xl filter drop-shadow-purple-500/70'
                        : 'text-gray-300 dark:text-gray-700 hover:text-purple-400/70'
                    } ${
                      star <= (hoveredRating || formData.rating)
                        ? 'animate-pulse'
                        : ''
                    }`}
                    style={{
                      filter: star <= (hoveredRating || formData.rating)
                        ? 'drop-shadow(0 4px 12px rgba(147, 51, 234, 0.5))'
                        : 'none'
                    }}
                  />
                  {star <= (hoveredRating || formData.rating) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-purple-600 dark:bg-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                    >
                      {star}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            {formData.rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center sm:text-left text-sm font-semibold text-purple-600 dark:text-purple-400"
              >
                Selected: {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your feedback message"
              rows={4}
              required
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-base py-6"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ✨
                  </motion.span>
                  Submit Feedback
                </span>
              )}
            </Button>
          </motion.div>
        </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

