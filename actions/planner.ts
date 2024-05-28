'use server';

import { Coordinates } from '@/components/destination';
import { prisma } from '@/lib/db/prisma';
import { TravelPlan } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const serverCreateNewTravelPlan = async (
  userId: string,
  pathname: string,
  count?: number
) => {
  //!  fetch the user and check if he has 3 or more plans.
  const newPlan = await prisma.travelPlan.create({
    data: {
      userId: userId,
      name: count ? `Seyehat Planı ${count}` : 'Yeni Seyehat Planı',
    },
  });

  redirect(`planner/${newPlan.id}`);
  /* revalidatePath(pathname); */
};

export const serverUpdateTravelPlan = async (
  planId: string,
  updateProps: Partial<TravelPlan>,
  pathname: string
) => {
  await prisma.travelPlan.update({
    where: {
      id: planId,
    },
    data: {
      ...updateProps,
    },
  });

  revalidatePath(pathname);
};

export const serverDeleteNewTravelPlan = async (
  planId: string,
  pathname: string
) => {
  await prisma.travelPlan.delete({
    where: {
      id: planId,
    },
  });

  revalidatePath(pathname);
};

export const serverCreateTravelPlace = async (
  planId: string,
  name: string,
  description: string,
  pathname: string,
  imageUrl: string,
  coordinates: Coordinates,
  tags: string[],
) => {
  await prisma.planPlace.create({
    data: {
      name,
      description,
      travelPlanId: planId,
      coordinates,
      tags,
      imageUrl,
    },
  });

  revalidatePath(pathname)
};
