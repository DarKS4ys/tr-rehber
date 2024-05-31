'use server';
import { ReactNode } from 'react';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { generateObject, nanoid } from 'ai';
import { destinationSchema, edibleSchema } from '@/schemas/ai';
import Destination from '@/components/destination';
import axios from 'axios';
import { getLanguageName } from '@/lib/utils';
import type { Locale } from '@/i18n.config';

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export async function continueConversation(
  input: string,
  planId: string,
  lang: Locale
): Promise<ClientMessage> {
  'use server';

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai('gpt-4o'),
    // combine history along with user's last message
    messages: [
      ...history.get(),
      { role: 'user', content: input },
      { role: 'system', content: `always respond to user in ${getLanguageName(lang)} language` },
    ],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: 'assistant', content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      findADestination: {
        description: 'Find a touristic destination for the user travel plan',
        parameters: z.object({
          description: z
            .string()
            .describe('The description of the desired location'),
          /*          tags: z
            .array(z.string())
            .describe(
              'A list of keywords provided by the user that characterize the desired destination (e.g., beach, historical, nightlife)'
            ),
           activities: z
            .array(z.string())
            .describe(
              'A list of activities or attractions that the destination should offer (e.g., hiking, museums, shopping)'
            ),
          travelPreferences: z
            .array(z.string())
            .optional()
            .describe(
              'Additional travel preferences (e.g., family-friendly, solo travel, adventure, relaxation)'
            ),
          season: z
            .string()
            .optional()
            .describe(
              'Preferred season or time of year for the trip (e.g., summer, winter)'
            ), */
        }),
        generate: async function* ({
          description /*tags,  activities, travelPreferences  */,
        }) {
          yield <div>loading...</div>;

          const destination = await generateObject({
            model: openai('gpt-4o'),
            schema: destinationSchema,
            // ! change and add lang
            //             prompt: `Select a destination within the Turkish city of Trabzon based on the user's given tags and preferences. Ensure the destination aligns with their specified activities, tags, preferred season and travel preferences to include in the final travel plan. Description of the desired place:  ${description}`,
            prompt: `Select a destination within the Turkish city of Trabzon that aligns with the description: ${description}. Always respond to user in ${getLanguageName(lang)} language.`,
          });

          const coordinates = await getCoordinates(
            `${destination.object.name}, Trabzon`
          );
          const imageUrl = await getImageUrl(destination.object.name);

          return (
            <Destination
              image={imageUrl}
              planId={planId}
              coordinates={coordinates}
              destination={destination.object}
            />
          );
        },
      },

      findAEdible: {
        description:
          'Find a traditional food or drink for the user travel plan',
        parameters: z.object({
          description: z
            .string()
            .describe('Short description of the wanted food/drink'),
          /*          tags: z
            .array(z.string())
            .describe(
              'A list of keywords provided by the user that characterize the desired destination (e.g., beach, historical, nightlife)'
            ),
           activities: z
            .array(z.string())
            .describe(
              'A list of activities or attractions that the destination should offer (e.g., hiking, museums, shopping)'
            ),
          travelPreferences: z
            .array(z.string())
            .optional()
            .describe(
              'Additional travel preferences (e.g., family-friendly, solo travel, adventure, relaxation)'
            ),
          season: z
            .string()
            .optional()
            .describe(
              'Preferred season or time of year for the trip (e.g., summer, winter)'
            ), */
        }),
        generate: async function* ({
          description /*tags,  activities, travelPreferences  */,
        }) {
          yield <div>loading...</div>;

          const destination = await generateObject({
            model: openai('gpt-4o'),
            schema: edibleSchema,
            // ! change and add lang
            //             prompt: `Select a destination within the Turkish city of Trabzon based on the user's given tags and preferences. Ensure the destination aligns with their specified activities, tags, preferred season and travel preferences to include in the final travel plan. Description of the desired place:  ${description}`,
            prompt: `Select a food that is special to the Turkish and Trabzon cuisine which aligns with the description: ${description}. Always respond to user in ${getLanguageName(lang)} language.`,
          });

          const coordinates = await getCoordinates(
            `${destination.object.name}, Trabzon`
          );
          const imageUrl = await getImageUrl(destination.object.name);

          return (
            <Destination
              image={imageUrl}
              planId={planId}
              coordinates={coordinates}
              destination={destination.object}
            />
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: 'assistant',
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  
  initialAIState: [],
  initialUIState: [],
});

async function getCoordinates(
  placeName: string
): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    placeName
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { results } = response.data;
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { lat, lng };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }

  return null;
}

async function getImageUrl(placeName: string): Promise<string | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx = process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_CX;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    `Trabzon ${placeName}`
  )}&cx=${cx}&searchType=image&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { items } = response.data;
    if (items && items.length > 0) {
      return items[0].link;
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
  }

  return null;
}
