import React from 'react';
import { Check } from 'lucide-react';
import type { MembershipTier } from '../../types';

interface PricingCardProps {
  tier: MembershipTier;
  price: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, price, features, isPopular, onSelect }) => {
  return (
    <div
      className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
        isPopular ? 'border-purple-600 shadow-lg' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2">{tier}</h3>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 ml-2">/month</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-lg font-medium transition-all ${
          isPopular
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
