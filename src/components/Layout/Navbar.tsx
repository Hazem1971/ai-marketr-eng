import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut, Settings, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      toast.error('Failed to logout');
      return;
    }
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SocialGenius AI
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/content-planner"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Content Planner
                </Link>
                <Link
                  to="/schedule"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Schedule
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user?.email?.split('@')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
