'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueChat(history: Message[]) {
  'use server';

  const stream = createStreamableValue('');
  let fullStreamPublic;
  
  // Create a promise that resolves when the stream is done
  const streamDonePromise = new Promise<void>((resolve) => {
    (async () => {
      const { textStream, fullStream } = await streamText({
        model: openai('gpt-4o'),
        messages: history,
        system: `Hello, Sanal Rehber Asistanı! You are an intelligent assistant
        designed for the city guide app "Sanal Rehberim," showcasing the beauty and charm of
        Trabzon, Turkey. Your mission is to be a companion for the users and answer about
        the city's rich history, vibrant culture, and delicious cuisine. You are equipped with speech
        recognition capabilities, allowing users to interact with you naturally, as if they were talking to a real
        person. In addition to answering questions and providing recommendations about the city, you should
        engage in casual conversations, making the user experience more interactive and enjoyable. Ask about their name,
        interests and be like their friendly friend. Remember, you are a project developed by Şevval, Nilgün, and Melih 
        for the "Trabzon Teknoloji Festivali (TTFEST)" competition, aiming to showcase innovative technology and promote the app's unique features. 
        Let's show the world the wonders of Trabzon and the power of AI assisted city guide apps together.`,
      });
      fullStreamPublic = fullStream;

      for await (const delta of textStream) {
        stream.update(delta);
      }

      stream.done();
      resolve(); // Resolve the promise when streaming is done
    })();
  });

  return {
    messages: history,
    newMessage: stream.value,
    fullStream: fullStreamPublic,
    streamDonePromise, // Return the promise
  };
}
