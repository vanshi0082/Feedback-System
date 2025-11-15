import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackTable from '../components/FeedbackTable';
import { getMyFeedbacks } from '../lib/api';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import ThemeToggle from '../components/ThemeToggle';

export default function Feedback() {
  const { user, logout } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const data = await getMyFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFeedbackSubmit = () => {
    fetchFeedbacks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-black dark:via-gray-900 dark:to-purple-950/20">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b-2 border-purple-200/50 dark:border-purple-800/50 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Feedback Management
          </h1>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">Welcome, {user?.name}</span>
            <ThemeToggle />
            <Button variant="outline" onClick={logout} className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4">
              <FaSignOutAlt className="text-sm" /> <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <FeedbackForm onSuccess={handleFeedbackSubmit} />
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <FeedbackTable feedbacks={feedbacks} showExport={false} title="My Feedbacks" />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

