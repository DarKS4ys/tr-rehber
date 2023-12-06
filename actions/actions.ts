'use server';

import { extractErrorMessage, validateString } from '@/lib/utils';
import { Resend } from 'resend';
import ContactFormEmail from '@/email/ContactFormEmail';
import React from 'react';
import { prisma } from '@/lib/db/prisma';
import type { Locale } from '@/i18n.config';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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
  placeData: Record<Locale, { name: string; description: string, videoUrl: string, info:string, tags: string[] }>,
  user: any,
  imageUrl: string,
  extraImageUrls: string[],
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
      const videoUrl = placeData[lang].videoUrl as string;
      const info = placeData[lang].info as string;
      const tags = placeData[lang].tags as string[];
      
      if (!validateString(name, 50)) {
        return {
          error: 'Invalid name',
        };
      }
      
      if (!validateString(description, 300)) {
        return {
          error: 'Invalid description',
        };
      }

      if (!validateString(videoUrl, 300)) {
        return {
          error: 'Invalid video url',
        };
      }

      if (!validateString(info, 5000)) {
        return {
          error: 'Invalid info',
        };
      }

      if (tags.some(tag => !validateString(tag, 50))) {
        return {
          error: 'Invalid tags',
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

      placeCreateData.data.videoUrl = {
        ...(placeCreateData.data.videoUrl || {}),
        [lang]: videoUrl,
      };

      placeCreateData.data.info = {
        ...(placeCreateData.data.info || {}),
        [lang]: info,
      };

      placeCreateData.data.tags = [
        ...(placeCreateData.data.tags || []),
        { [lang]: tags },
      ];
    }

    if (!validateString(imageUrl, 500)) {
      return {
        error: 'Invalid image url',
      };
    }

    if (extraImageUrls.some((url) => !validateString(url, 500))) {
      return {
        error: 'Invalid extra image url(s)',
      };
    }


    placeCreateData.data.imageUrl = imageUrl;

    placeCreateData.data.images = extraImageUrls;

    const createdPlace = await prisma.place.create(placeCreateData);

      
      await prisma.placeSnippet.create({
        data: {
          name: placeCreateData.data.name,
          description: placeCreateData.data.description,
          tags: placeCreateData.data.tags,
          imageUrl: placeCreateData.data.imageUrl,
          images: placeCreateData.data.images,
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

export async function saveFileToDB(fileUrl: string, downloadUrl: string, userId: string | undefined) {
  try {
    await prisma.file.create({
      data: {
        fileUrl: fileUrl,
        downloadUrl: downloadUrl,
        user: { connect: { id: userId } },
      }
    })

    revalidatePath('/[lang]/admin');

    return { success: true, message: "File uploaded successfully" };
  } catch (error) {
    throw new Error("Something went wrong while saving file to database")
  }
}

export async function deleteFile(fileId: string) {
  try {
    await prisma.file.delete({
      where: { id: fileId }
    })
    
    revalidatePath('/[lang]/admin');
    
    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    throw new Error("Something went wrong while deleting the file")
  }
}


