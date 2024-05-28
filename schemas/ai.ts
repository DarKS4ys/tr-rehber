import { DeepPartial } from 'ai';
import { z } from 'zod';

export const destinationSchema = z.object({
  name: z.string().describe('The name of the destination'),
  tags: z.array(z.string()).describe('The tags of the destination'),
  description: z.string().describe('A description of the destination'),
});

export const edibleSchema = z.object({
  name: z.string().describe('The name of the food/drink'),
  tags: z.array(z.string()).describe('The tags of the food/drink'),
  description: z.string().describe('A description of the food/drink'),
  origin: z.string().describe('The origin of the food/drink'),
});

export const hotelSchema = z.object({
  name: z.string().describe('The name of the hotel'),
  location: z.string().describe('The location of the hotel'),
  stars: z.number().describe('How many stars the hotle has'),
})

export type Destination = DeepPartial<typeof destinationSchema>
export type Hotel = DeepPartial<typeof hotelSchema>
