import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { FaStar, FaSearch, FaDownload, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { exportToCSV } from '../utils/csvExport';

export default function FeedbackTable({ feedbacks, showExport = true, title = 'All Feedback' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Filter feedbacks based on search and rating
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchesSearch =
        searchTerm === '' ||
        feedback.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.message?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        ratingFilter === 'all' || feedback.rating === parseInt(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [feedbacks, searchTerm, ratingFilter]);

  const handleExport = () => {
    exportToCSV(filteredFeedbacks, 'feedbacks');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm transition-colors ${
              star <= rating ? 'text-purple-600 dark:text-purple-400' : 'text-gray-300 dark:text-gray-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-br from-white to-purple-50/20 dark:from-gray-900 dark:to-purple-950/10">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              View and manage all submitted feedback
            </CardDescription>
          </div>
          {showExport && filteredFeedbacks.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleExport}
                className="flex items-center gap-2.5 w-full sm:w-auto bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaDownload className="text-lg" />
                </motion.div>
                <span>Export CSV</span>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 dark:text-purple-400 z-10" />
              <Input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 border-purple-200 dark:border-purple-700 focus-visible:border-purple-500 dark:focus-visible:border-purple-600"
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-2 sm:w-auto w-full">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30"
            >
              <FaFilter className="text-purple-600 dark:text-purple-400" />
            </motion.div>
            <Label htmlFor="rating-filter" className="whitespace-nowrap font-semibold text-purple-700 dark:text-purple-300">
              Rating:
            </Label>
            <select
              id="rating-filter"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="flex h-12 w-full sm:w-auto rounded-xl border-2 border-purple-200 dark:border-purple-700 bg-gradient-to-r from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 focus-visible:outline-none focus-visible:border-purple-500 dark:focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-500/20 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="all">⭐ All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
              <option value="3">⭐⭐⭐ 3 Stars</option>
              <option value="2">⭐⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </div>
        </div>

        {filteredFeedbacks.length !== feedbacks.length && (
          <div className="mt-4 text-sm text-purple-600 dark:text-purple-400">
            Showing {filteredFeedbacks.length} of {feedbacks.length} feedbacks
          </div>
        )}
      </CardHeader>
      <CardContent>
        {feedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            No feedback submitted yet.
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            No feedback found matching your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/30 backdrop-blur-sm">
                  <th className="text-left p-3 sm:p-5 font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wide text-xs sm:text-sm">Name</th>
                  <th className="text-left p-3 sm:p-5 font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wide text-xs sm:text-sm hidden md:table-cell">Email</th>
                  <th className="text-left p-3 sm:p-5 font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wide text-xs sm:text-sm">Rating</th>
                  <th className="text-left p-3 sm:p-5 font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wide text-xs sm:text-sm">Message</th>
                  <th className="text-left p-3 sm:p-5 font-bold text-purple-800 dark:text-purple-200 uppercase tracking-wide text-xs sm:text-sm hidden lg:table-cell">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((feedback, index) => (
                  <motion.tr
                    key={feedback._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-gray-100 dark:border-gray-800 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100/50 dark:hover:from-purple-950/30 dark:hover:to-purple-900/20 hover:shadow-md ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'
                    }`}
                  >
                    <td className="p-3 sm:p-5 font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                      {feedback.name}
                    </td>
                    <td className="p-3 sm:p-5 text-gray-600 dark:text-gray-400 text-sm sm:text-base hidden md:table-cell">
                      {feedback.email || 'N/A'}
                    </td>
                    <td className="p-3 sm:p-5">{renderStars(feedback.rating)}</td>
                    <td className="p-3 sm:p-5 max-w-xs sm:max-w-md text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate sm:whitespace-normal">
                      {feedback.message}
                    </td>
                    <td className="p-3 sm:p-5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium hidden lg:table-cell">
                      {formatDate(feedback.createdAt)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

