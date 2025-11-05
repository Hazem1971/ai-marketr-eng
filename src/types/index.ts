export type MembershipTier = 'free' | 'pro' | 'enterprise';

export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'tiktok';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  industry: string;
  target_audience: string;
  brand_voice: string;
  logo_url?: string;
  website_url?: string;
  membership_tier: MembershipTier;
  created_at: string;
  updated_at: string;
}

export interface SocialPost {
  id: string;
  profile_id: string;
  platform: SocialPlatform;
  content: string;
  media_urls?: string[];
  scheduled_time?: string;
  published_time?: string;
  status: PostStatus;
  engagement_metrics?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  created_at: string;
  updated_at: string;
}

export interface ContentPlan {
  id: string;
  profile_id: string;
  week_start_date: string;
  posts: ContentPlanPost[];
  status: 'pending' | 'approved' | 'active';
  created_at: string;
  updated_at: string;
}

export interface ContentPlanPost {
  id: string;
  day: string;
  platform: SocialPlatform;
  topic: string;
  content_type: string;
  suggested_time: string;
}

export interface PlatformConnection {
  id: string;
  profile_id: string;
  platform: SocialPlatform;
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  account_id: string;
  account_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIGenerationRequest {
  prompt: string;
  platform: SocialPlatform;
  tone?: string;
  max_length?: number;
  include_hashtags?: boolean;
  include_emojis?: boolean;
}

export interface AIGenerationResponse {
  content: string;
  hashtags?: string[];
  confidence_score: number;
  model_used: 'huggingface' | 'openai';
}
