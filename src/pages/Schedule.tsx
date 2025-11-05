import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import PostCard from '../components/Cards/PostCard';
import { useAuthStore } from '../store/authStore';
import { postService } from '../services/post.service';
import type { SocialPost } from '../types';

const Schedule: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'draft'>('all');
  const { profile } = useAuthStore();

  useEffect(() => {
    loadPosts();
  }, [profile]);

  const loadPosts = async () => {
    if (!profile) return;
    const fetchedPosts = await postService.getPosts(profile.id);
    setPosts(fetchedPosts);
  };

  const handleDelete = async (id: string) => {
    await postService.deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span>Content Schedule</span>
            </h1>
            <p className="text-gray-600 mt-2">Manage and schedule your social media posts</p>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </button>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-600'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'scheduled'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-600'
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'draft'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-600'
            }`}
          >
            Drafts
          </button>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Start creating content to see it here</p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={(post) => console.log('Edit', post)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
