'use client';

import { Trash } from 'lucide-react';
import React, { useTransition } from 'react';
import { Button } from './ui/button';
import type { Place } from '@prisma/client';
import { deleteSavedPlace } from '@/actions/actions';
import { MoonLoader } from 'react-spinners';
import { toast } from 'sonner';
import type { Locale } from '@/i18n.config';

export default function DeleteButton({
  user,
  place,
  lang,
  local,
  id
}: {
  id: string | undefined
  user: any;
  place: Place;
  lang: Locale,
  local: any
}) {
  const [isPending, startTransition] = useTransition();

  const handleDeletePlace = async () => {
    const response = await deleteSavedPlace(id, user.id);

    if (response.success) {
      toast((place.name as { [key in Locale]: string })[lang] + ' ' + local.deleteMessage)
    }
  };

  const handleButtonClick = () => {
    if (!isPending) {
      startTransition(() => {
        handleDeletePlace();
      });
    }
  };

  return (
    <Button
      variant="destructive"
      className="opacity-70 hover:opacity-100 w-12 h-12 p-0 transition disabled:cursor-not-allowed"
      onClick={handleButtonClick}
      disabled={isPending}
    >
      {isPending ?
      <>
      <div className='flex dark:hidden items-center justify-center'>
        <MoonLoader size={20} color="#fff" loading={isPending}/>
      </div>
      <div className='hidden dark:flex items-center justify-center'>
        <MoonLoader size={20} color="#000" loading={isPending}/>
      </div>
      </>
      : <Trash />}
      
    </Button>
  );
}
