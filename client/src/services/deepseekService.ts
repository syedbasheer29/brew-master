import axios from 'axios';

interface DeepSeekResponse {
  choices: [{
    message: {
      content: string;
    }
  }];
}

const DEEPSEEK_API_URL = 'https://api.deepseek.ai/v1/chat/completions';

export class DeepSeekService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const response = await axios.post<DeepSeekResponse>(
        DEEPSEEK_API_URL,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable coffee expert assistant helping customers with coffee-related questions. Provide detailed, accurate, and helpful responses about coffee beans, brewing methods, equipment, and general coffee knowledge. Keep your responses focused on coffee-related topics.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      throw new Error('Failed to generate response');
    }
  }
}

// Create a singleton instance
let deepseekService: DeepSeekService | null = null;

export const initializeDeepSeekService = (apiKey: string) => {
  deepseekService = new DeepSeekService(apiKey);
};

export const getDeepSeekService = () => {
  if (!deepseekService) {
    throw new Error('DeepSeek service not initialized. Call initializeDeepSeekService first.');
  }
  return deepseekService;
}; 