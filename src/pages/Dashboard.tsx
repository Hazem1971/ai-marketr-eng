import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, FileText, Users, BarChart3, Plus } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import { useAuthStore } from '../store/authStore';
import { postService } from '../services/post.service';
import type { SocialPost } from '../types';

const Dashboard: React.FC = () => {
  const { profile } = useAuthStore();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, [profile]);

  const loadPosts = async () => {
    if (!profile) return;
    setIsLoading(true);
    const fetchedPosts = await postService.getPosts(profile.id);
    setPosts(fetchedPosts);
    setIsLoading(false);
  };

  const stats = [
    {
      icon: FileText,
      label: 'Total Posts',
      value: posts.length.toString(),
      change: '+12%',
      color: 'purple',
    },
    {
      icon: Calendar,
      label: 'Scheduled',
      value: posts.filter(p => p.status === 'scheduled').length.toString(),
      change: '+8%',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      label: 'Engagement',
      value: '24.5K',
      change: '+23%',
      color: 'green',
    },
    {
      icon: Users,
      label: 'Followers',
      value: '12.3K',
      change: '+15%',
      color: 'pink',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.business_name || 'there'}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your social media today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/generate"
                className="p-6 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-600 hover:bg-purple-50 transition-all group"
              >
                <Plus className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Generate Post</h3>
                <p className="text-sm text-gray-600">Create AI-powered content instantly</p>
              </Link>

              <Link
                to="/content-planner"
                className="p-6 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-600 hover:bg-blue-50 transition-all"
              >
                <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Weekly Plan</h3>
                <p className="text-sm text-gray-600">Get AI-generated content calendar</p>
              </Link>

              <Link
                to="/schedule"
                className="p-6 rounded-xl border-2 border-dashed border-green-300 hover:border-green-600 hover:bg-green-50 transition-all"
              >
                <FileText className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Schedule Posts</h3>
                <p className="text-sm text-gray-600">Plan your content in advance</p>
              </Link>

              <Link
                to="/analytics"
                className="p-6 rounded-xl border-2 border-dashed border-pink-300 hover:border-pink-600 hover:bg-pink-50 transition-all"
              >
                <BarChart3 className="w-8 h-8 text-pink-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
                <p className="text-sm text-gray-600">Track your performance metrics</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{post.platform} • {post.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
