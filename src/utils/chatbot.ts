interface ChatResponse {
  content: string;
  followUp?: string[];
}

type Intent = 
  | 'greeting'
  | 'coffee_recommendation'
  | 'brewing_tips'
  | 'equipment_help'
  | 'order_status'
  | 'default';

const RESPONSES: Record<Intent, ChatResponse[]> = {
  greeting: [
    {
      content: "Hello! I'm your coffee expert assistant. How can I help you today?",
      followUp: [
        "Would you like coffee recommendations?",
        "Need help with brewing techniques?",
        "Looking for equipment suggestions?",
      ],
    },
  ],
  coffee_recommendation: [
    {
      content: "I'd be happy to help you find the perfect coffee! What's your preferred roast level? (Light, Medium, or Dark)",
      followUp: ["Do you prefer fruity or chocolatey notes?", "How do you usually brew your coffee?"],
    },
    {
      content: "Based on your taste preferences, I'd recommend trying our Ethiopian Yirgacheffe for bright, fruity notes, or our Colombian blend for a balanced, caramel sweetness.",
    },
  ],
  brewing_tips: [
    {
      content: "For the perfect cup, start with freshly ground beans and water at 200°F (93°C). What brewing method are you using?",
      followUp: ["Pour-over", "French Press", "Espresso", "Drip Coffee"],
    },
    {
      content: "Here's a key tip: for pour-over, use a medium-fine grind and a 1:16 coffee-to-water ratio. Start with a 30-second bloom using twice the coffee weight in water.",
    },
  ],
  equipment_help: [
    {
      content: "I can help you choose the right equipment. What's your budget range and primary brewing method?",
      followUp: ["Under $100", "$100-$500", "Over $500"],
    },
    {
      content: "For precision brewing, I recommend starting with our Digital Coffee Scale. It's essential for consistent results and includes a built-in timer.",
    },
  ],
  order_status: [
    {
      content: "I can help you track your order. Please provide your order number, and I'll check its status.",
    },
  ],
  default: [
    {
      content: "I'm not sure I understood that. Could you rephrase your question? I'm here to help with coffee recommendations, brewing tips, and equipment selection.",
      followUp: [
        "Need coffee recommendations?",
        "Want brewing tips?",
        "Looking for equipment?",
      ],
    },
  ],
};

export function detectIntent(message: string): Intent {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    return 'greeting';
  }
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion') || lowerMessage.includes('what coffee')) {
    return 'coffee_recommendation';
  }
  if (lowerMessage.includes('brew') || lowerMessage.includes('make') || lowerMessage.includes('how to')) {
    return 'brewing_tips';
  }
  if (lowerMessage.includes('machine') || lowerMessage.includes('grinder') || lowerMessage.includes('equipment')) {
    return 'equipment_help';
  }
  if (lowerMessage.includes('order') || lowerMessage.includes('tracking') || lowerMessage.includes('status')) {
    return 'order_status';
  }
  
  return 'default';
}

export function generateResponse(message: string): ChatResponse {
  const intent = detectIntent(message);
  const responses = RESPONSES[intent];
  return responses[Math.floor(Math.random() * responses.length)];
}