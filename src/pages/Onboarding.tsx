import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, Mic, Sparkles } from 'lucide-react';
import { profileService } from '../services/profile.service';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    target_audience: '',
    brand_voice: '',
    website_url: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, setProfile } = useAuthStore();
  const navigate = useNavigate();

  const industries = [
    'E-commerce', 'SaaS', 'Healthcare', 'Finance', 'Education',
    'Real Estate', 'Food & Beverage', 'Fashion', 'Technology', 'Other'
  ];

  const brandVoices = [
    'Professional', 'Casual', 'Friendly', 'Authoritative',
    'Humorous', 'Inspirational', 'Educational'
  ];

  const handleSubmit = async () => {
    if (!user) return;

    setIsLoading(true);

    const { profile, error } = await profileService.createProfile({
      user_id: user.id,
      ...formData,
      membership_tier: 'free',
    });

    if (error) {
      toast.error('Failed to create profile');
      setIsLoading(false);
      return;
    }

    if (profile) {
      setProfile(profile);
      toast.success('Profile created successfully!');
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Set Up Your Profile</h1>
          <p className="text-gray-600">Tell us about your business so we can personalize your experience</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-purple-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your Business Name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL (Optional)</label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="">Select your industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Describe your ideal customer (e.g., millennials interested in sustainable fashion)"
                  rows={3}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Voice</label>
              <div className="grid grid-cols-2 gap-3">
                {brandVoices.map((voice) => (
                  <button
                    key={voice}
                    type="button"
                    onClick={() => setFormData({ ...formData, brand_voice: voice })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.brand_voice === voice
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Mic className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">{voice}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? 'Creating Profile...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
