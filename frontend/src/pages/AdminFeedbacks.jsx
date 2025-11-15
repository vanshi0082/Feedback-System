import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FeedbackTable from '../components/FeedbackTable';
import { getFeedbacks } from '../lib/api';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { FaSignOutAlt, FaChartBar } from 'react-icons/fa';
import ThemeToggle from '../components/ThemeToggle';

export default function AdminFeedbacks() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const data = await getFeedbacks();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-black dark:via-gray-900 dark:to-purple-950/20">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b-2 border-purple-200/50 dark:border-purple-800/50 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              All Feedbacks
            </h1>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <FaChartBar /> <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">Admin: {user?.name}</span>
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
          <div className="mb-8 sm:mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent"
            >
              All Feedbacks
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">View and manage all submitted feedback</p>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <FeedbackTable feedbacks={feedbacks} showExport={true} title="All Feedbacks" />
          )}
        </motion.div>
      </div>
    </div>
  );
}

