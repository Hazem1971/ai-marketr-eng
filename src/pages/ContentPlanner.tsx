import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, RefreshCw } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import { aiService } from '../services/ai.service';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ContentPlanner: React.FC = () => {
  const [contentPlan, setContentPlan] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { profile } = useAuthStore();

  useEffect(() => {
    if (profile) {
      generatePlan();
    }
  }, [profile]);

  const generatePlan = async () => {
    if (!profile) return;

    setIsGenerating(true);
    try {
      const plan = await aiService.generateWeeklyPlan({
        industry: profile.industry,
        target_audience: profile.target_audience,
      });
      setContentPlan(plan);
      toast.success('Weekly plan generated!');
    } catch (error) {
      toast.error('Failed to generate plan');
    }
    setIsGenerating(false);
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-blue-500',
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-700',
      tiktok: 'bg-black',
    };
    return colors[platform] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span>Weekly Content Planner</span>
            </h1>
            <p className="text-gray-600 mt-2">AI-generated content calendar for the week</p>
          </div>
          <button
            onClick={generatePlan}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Regenerate Plan'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {contentPlan.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-bold text-gray-900">{item.day}</h3>
                      <span className={`${getPlatformColor(item.platform)} text-white px-3 py-1 rounded-full text-xs font-medium uppercase`}>
                        {item.platform}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {item.content_type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{item.topic}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Suggested: {item.suggested_time}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Generate Post
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentPlanner;
