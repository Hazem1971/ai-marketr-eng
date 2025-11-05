import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PlatformCardProps {
  icon: LucideIcon;
  name: string;
  isConnected: boolean;
  onClick: () => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ icon: Icon, name, isConnected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
        isConnected
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 hover:border-purple-500 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`w-8 h-8 ${isConnected ? 'text-green-600' : 'text-gray-600'}`} />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {isConnected ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isConnected
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default PlatformCard;
