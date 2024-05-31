'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Search from './search';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n.config';

export default function SearchButton({
  modal,
  lang,
  planId,
  input
}: {
  lang: Locale;
  planId: string | undefined;
  modal: string;
  input: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Dialog open={modal == 'true'} onOpenChange={() => modal == 'true' ? router.push(`${pathname}`) : router.push(`${pathname}?modal=true`)}>
      <DialogTrigger asChild>
        <Button onClick={() => router.push(`${pathname}?modal=true`)} className="font-medium gap-x-1">
          <AiOutlineSearch /> Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-xl">
        {planId && <Search predefinedInput={input} planId={planId} lang={lang} />}
      </DialogContent>
    </Dialog>
  );
}
