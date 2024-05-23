'use server';

import { Coordinates } from '@/components/destination';
import { prisma } from '@/lib/db/prisma';
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
  coordinates: Coordinates
) => {
  await prisma.planPlace.create({
    data: {
      name: name,
      description: description,
      travelPlanId: planId,
      coordiantes: coordinates,
      imageUrl: imageUrl,
    },
  });
};
