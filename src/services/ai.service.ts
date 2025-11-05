import axios from 'axios';
import type { AIGenerationRequest, AIGenerationResponse } from '../types';

export class AIService {
  private huggingFaceApiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  private openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      return await this.generateWithHuggingFace(request);
    } catch (error) {
      console.error('HuggingFace failed, trying OpenAI fallback:', error);
      return await this.generateWithOpenAI(request);
    }
  }

  private async generateWithHuggingFace(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const prompt = this.buildPrompt(request);

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        inputs: prompt,
        parameters: {
          max_length: request.max_length || 200,
          temperature: 0.7,
          top_p: 0.9,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${this.huggingFaceApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      content: this.extractContent(response.data),
      hashtags: request.include_hashtags ? this.generateHashtags(request.prompt) : undefined,
      confidence_score: 0.85,
      model_used: 'huggingface',
    };
  }

  private async generateWithOpenAI(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const prompt = this.buildPrompt(request);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a creative social media content writer.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: request.max_length || 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${this.openAiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      content: response.data.choices[0].message.content,
      hashtags: request.include_hashtags ? this.generateHashtags(request.prompt) : undefined,
      confidence_score: 0.92,
      model_used: 'openai',
    };
  }

  private buildPrompt(request: AIGenerationRequest): string {
    let prompt = `Create a ${request.platform} post about: ${request.prompt}`;

    if (request.tone) {
      prompt += `\nTone: ${request.tone}`;
    }

    if (request.include_emojis) {
      prompt += '\nInclude relevant emojis.';
    }

    return prompt;
  }

  private extractContent(data: any): string {
    if (Array.isArray(data)) {
      return data[0]?.generated_text || '';
    }
    return data?.generated_text || '';
  }

  private generateHashtags(topic: string): string[] {
    const words = topic.toLowerCase().split(' ');
    return words.slice(0, 5).map(word => `#${word.replace(/[^a-z0-9]/g, '')}`);
  }

  async generateWeeklyPlan(businessProfile: { industry: string; target_audience: string }): Promise<any[]> {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const platforms: Array<'facebook' | 'instagram' | 'linkedin' | 'tiktok'> = ['facebook', 'instagram', 'linkedin', 'tiktok'];
    const contentTypes = ['Educational', 'Promotional', 'Behind-the-scenes', 'User-generated', 'Trending'];

    return days.map((day, index) => ({
      id: `plan-${index}`,
      day,
      platform: platforms[index % platforms.length],
      topic: `Engaging content for ${businessProfile.target_audience}`,
      content_type: contentTypes[index % contentTypes.length],
      suggested_time: '10:00 AM',
    }));
  }
}

export const aiService = new AIService();
