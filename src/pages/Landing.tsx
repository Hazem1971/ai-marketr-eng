import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Calendar, TrendingUp, Users, Shield } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import PricingCard from '../components/Cards/PricingCard';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Content',
      description: 'Generate engaging posts with advanced AI that mimics your brand voice',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Automatically schedule posts at optimal times for maximum engagement',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track performance across all platforms with detailed insights',
    },
    {
      icon: Users,
      title: 'Multi-Platform',
      description: 'Manage Facebook, Instagram, LinkedIn, and TikTok from one place',
    },
    {
      icon: Zap,
      title: 'Weekly Plans',
      description: 'Get AI-generated weekly content plans tailored to your business',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security to keep your data and accounts safe',
    },
  ];

  const pricingPlans = [
    {
      tier: 'free' as const,
      price: '0',
      features: [
        '10 AI-generated posts per month',
        '2 social media platforms',
        'Basic analytics',
        'Email support',
      ],
    },
    {
      tier: 'pro' as const,
      price: '49',
      features: [
        'Unlimited AI-generated posts',
        'All social media platforms',
        'Advanced analytics',
        'Priority support',
        'Weekly content plans',
        'Brand voice training',
      ],
      isPopular: true,
    },
    {
      tier: 'enterprise' as const,
      price: '199',
      features: [
        'Everything in Pro',
        'Multiple team members',
        'API access',
        'Custom AI training',
        'Dedicated account manager',
        'White-label options',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Transform Your Social Media
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                With AI Power
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create engaging content, schedule posts, and grow your audience across all platforms with AI-powered automation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-purple-600 transition-all"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to dominate social media</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                tier={plan.tier}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                onSelect={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of businesses using AI to grow their online presence
          </p>
          <Link
            to="/signup"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
