'use client';

import { Save } from 'lucide-react';
import React, { useTransition } from 'react';
import { Button } from './ui/button';
import type { Place } from '@prisma/client';
import { savePlace } from '@/actions/actions';
import { MoonLoader } from 'react-spinners';
import { toast } from 'sonner';
import type { Locale } from '@/i18n.config';
import { useRouter } from 'next/navigation';
export default function SaveButton({
  user,
  place,
  lang,
  local
}: {
  user: any;
  place: Place;
  lang: Locale,
  local: any
}) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter()

  const handleSavePlace = async () => {
    const response = await savePlace(user, place);

    if (response.success) {
      toast((place.name as { [key in Locale]: string })[lang] + ' ' + local.message, {
        action: {
          label: local.action,
          onClick: () => router.push(`/${lang}/saved-places`)
        },
      })
    }
  };

  const handleButtonClick = () => {
    if (!isPending) {
      startTransition(() => {
        handleSavePlace();
      });
    }
  };

  return (
    <Button
      className="shadow-xl opacity-80 hover:opacity-100 text-primary w-12 h-12 p-0 transition disabled:cursor-not-allowed"
      onClick={handleButtonClick}
      disabled={isPending}
      variant="outline"
    >
      {isPending ?
      <>
      <div className='flex dark:hidden items-center justify-center'>
        <MoonLoader size={20} color="#000" loading={isPending}/>
      </div>
      <div className='hidden dark:flex items-center justify-center'>
        <MoonLoader size={20} color="#fff" loading={isPending}/>
      </div>
      </>
      : <Save />}
      
    </Button>
  );
}
