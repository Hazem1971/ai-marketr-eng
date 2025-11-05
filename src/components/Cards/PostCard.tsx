import React from 'react';
import { Calendar, BarChart3, Trash2, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import type { SocialPost } from '../../types';

interface PostCardProps {
  post: SocialPost;
  onEdit: (post: SocialPost) => void;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-blue-500',
      instagram: 'bg-pink-500',
      linkedin: 'bg-blue-700',
      tiktok: 'bg-black',
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-500',
      scheduled: 'bg-yellow-500',
      published: 'bg-green-500',
      failed: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`${getPlatformColor(post.platform)} text-white px-3 py-1 rounded-full text-xs font-medium uppercase`}>
            {post.platform}
          </span>
          <span className={`${getStatusColor(post.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
            {post.status}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(post)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

      {post.scheduled_time && (
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(post.scheduled_time), 'MMM dd, yyyy - hh:mm a')}</span>
        </div>
      )}

      {post.engagement_metrics && (
        <div className="flex items-center space-x-4 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.engagement_metrics.likes} likes</span>
          </div>
          <div className="text-sm text-gray-600">{post.engagement_metrics.comments} comments</div>
          <div className="text-sm text-gray-600">{post.engagement_metrics.shares} shares</div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
