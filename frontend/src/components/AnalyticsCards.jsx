import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { FaStar, FaThumbsUp, FaThumbsDown, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AnalyticsCards({ stats }) {
  const cards = [
    {
      title: 'Total Feedback',
      value: stats?.total || 0,
      icon: FaComments,
      color: 'bg-blue-50 dark:bg-blue-950/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Average Rating',
      value: stats?.averageRating?.toFixed(1) || '0.0',
      icon: FaStar,
      color: 'bg-purple-50 dark:bg-purple-950/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      title: 'Positive Feedback',
      value: stats?.positive || 0,
      icon: FaThumbsUp,
      color: 'bg-teal-50 dark:bg-teal-950/20',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-200 dark:border-teal-800',
    },
    {
      title: 'Negative Feedback',
      value: stats?.negative || 0,
      icon: FaThumbsDown,
      color: 'bg-rose-50 dark:bg-rose-950/20',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-200 dark:border-rose-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 ${card.borderColor} ${card.color} backdrop-blur-sm`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {card.title}
                </CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-3.5 rounded-2xl ${card.color} border-2 ${card.borderColor} shadow-lg backdrop-blur-sm`}
                >
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </motion.div>
              </CardHeader>

              <CardContent className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`text-4xl font-extrabold ${card.iconColor} tracking-tight`}
                >
                  {card.value}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
