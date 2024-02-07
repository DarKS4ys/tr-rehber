'use server';

import { extractErrorMessage, validateString } from '@/lib/utils';
import { Resend } from 'resend';
import ContactFormEmail from '@/email/ContactFormEmail';
import React from 'react';
import { prisma } from '@/lib/db/prisma';
import type { Locale } from '@/i18n.config';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { User } from 'next-auth';
import type { Place } from '@prisma/client';

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
  placeData: Record<Locale, { name: string; description: string, videoUrl: string, info:string, tags: string[], audioUrl: string }>,
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
      const audioUrl = placeData[lang].audioUrl as string;
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

      if (!validateString(audioUrl, 5000)) {
        return {
          error: 'Invalid audio url',
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

      placeCreateData.data.audioUrl = {
        ...(placeCreateData.data.audioUrl || {}),
        [lang]: audioUrl,
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



const commentTextSchema = z.string().min(1).max(500);

export async function sendComment(placeId: string, text: string, user: any) {
  try {
    // Check if the user object has a valid 'id' property
    if (!user || !user.id) {
      throw new Error('You have to be logged in to send a comment');
    }

    commentTextSchema.parse(text);

    await prisma.comment.create({
      data: {
        text: text,
        user: { connect: { id: user.id } },
        place: { connect: { id: placeId } },
        allowed: false
      },
    });

    revalidatePath('/explore/[id]');

    return { success: true };
  } catch (error: any) {
    if (z.instanceof(error)) {
      throw new Error('The comment must to be between 1 and 500 characters');
    }

    return { error: error.message };
  }
}


// ! user status check 
export async function deleteComment(
  commentId: any,
  userStatus: string | undefined,
  multiple?: boolean,
  userId?: string,
  commentUserId?: string
) {
  try {
    if (userStatus != 'Admin' && userId !== commentUserId) {
      throw new Error('The comment does not belong to you.');
    }

    if(multiple) {
      await prisma.comment.deleteMany({
        where: { id: { in: commentId } },
      });
    } else {
      await prisma.comment.delete({
        where: { id: commentId },
      });
    }

    
    revalidatePath('/explore/[id]');

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to delete comment' };
  }
}

export async function approveComment(commentIds: string[] | undefined, userStatus: string | undefined, page: number, pageSize:number) {
  try {
    if(userStatus !== 'Admin') {
      throw new Error ('You are not allowed to take this action.')
    }

    await prisma.comment.updateMany({
      where: {
        id: { in: commentIds }, // Use 'in' to match multiple IDs
      },
      data: {
        allowed: true,
      },
    })

    revalidatePath(`admin/comments/?page=${page}&pageSize=${pageSize}`);

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to approve comment' };
  }
}

export async function sendFeedback(feedback: string) {
  try {
    if (!feedback) {
      throw new Error('No feedback provided')
    } else if(feedback.length > 500) {
      throw new Error('The feedback must be less than 500 characters');
    }

    await prisma.feedback.create({
      data: {
        feedback: feedback
      }
    })

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to send feedback' };
  }
}

export async function savePlace(user: User, place: Place) {
  try {
    await prisma.savedPlace.create({
      data: {
        user: { connect: { id: user.id } },
        place: { connect: { id: place.id } },
      }
    })
    return { success: true };
  } catch (error: any){
    console.log(error)
    return { error: error.message || 'Failed to save place' };
  }
}

export async function deleteSavedPlace(id: string | undefined, userId: string) {
  try {
    if (!id) {
      throw new Error ('There was an issue with your request, try again later.')
    }
    const savedPlace = await prisma.savedPlace.findUnique({
      where: { id },
      select: { userId: true }, // Select only the userId to compare with the provided userId
    });

    if (!savedPlace) {
      return { error: 'SavedPlace not found' };
    }

    if (savedPlace.userId !== userId) {
      return { error: 'Unauthorized: User does not have permission to delete this SavedPlace' };
    }

    await prisma.savedPlace.delete({
      where: {
        id,
      },
    });

    revalidatePath('/[lang]/saved-places')
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || 'Failed to delete SavedPlace' };
  }
}