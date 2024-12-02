import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBKTGDc8RasTCKNfI4BCDRTH31AMdXNYIk');

export async function chatWithGemini(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: 'You are DealFlow GPT, an AI assistant specialized in investment banking, deal structuring, and financial advisory. Be concise and professional.',
        },
        {
          role: 'model',
          parts: 'Understood. I am DealFlow GPT, ready to assist with investment banking, deal structuring, and financial advisory matters.',
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}