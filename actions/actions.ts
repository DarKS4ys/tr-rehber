'use server';

import { extractErrorMessage, validateString } from '@/lib/utils';
import { Resend } from 'resend';
import ContactFormEmail from '@/email/ContactFormEmail';
import React from 'react';
import { prisma } from '@/lib/db/prisma';
import type { Locale } from '@/i18n.config';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail'); //email
  const message = formData.get('message');

  if (!validateString(senderEmail, 500)) {
    return {
      error: 'Invalid sender email',
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: 'Invalid message',
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: 'Trabzon Rehberim <onboarding@resend.dev>',
      to: 'melihyardim1057@gmail.com',
      subject: 'Message from Trabzon Rehberim',
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error: unknown) {
    return {
      error: extractErrorMessage(error),
    };
  }

  return {
    data,
  };
};

export async function createPlace(
  placeData: Record<Locale, { name: string; description: string }>,
  user: any,
  imageUrl: string,

) {


  try {
    if (!user || !user.id) {
      throw new Error('You have to be logged in to send a comment');
    }

    const placeCreateData: any = {
      data: {},
    };

    for (const lang of Object.keys(placeData) as Array<
      keyof typeof placeData
    >) {
      const name = placeData[lang].name as string;
      const description = placeData[lang].description as string;
      
      if (!validateString(name, 50)) {
        return {
          error: 'Invalid name',
        };
      }
      
      if (!validateString(description, 500)) {
        return {
          error: 'Invalid description',
        };
      }
      
      placeCreateData.data.name = {
        ...(placeCreateData.data.name || {}),
        [lang]: name,
      };
      
      placeCreateData.data.description = {
        ...(placeCreateData.data.description || {}),
        [lang]: description,
      };
    }

    if (!validateString(imageUrl, 5000)) {
      return {
        error: 'Invalid image url',
      };
    }

    placeCreateData.data.imageUrl = imageUrl;

    const createdPlace = await prisma.place.create(placeCreateData);

    await prisma.placeSnippet.create({
      data: {
        place: { connect: { id: createdPlace.id } },
      },
    });

    console.log('Place created');

    return { success: true };
  } catch (error: any) {

    console.log(error)
    if (z.instanceof(error)) {
      throw new Error('Something went wrong, please try again');
    }

    return { error: error.message };
  }
}