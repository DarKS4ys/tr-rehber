import AdminCard from '@/components/AdminCard';
import Time from '@/components/Time';
import Upload from '@/components/Upload';
import { Locale } from '@/i18n.config';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react';
import ProfileImg from '@/public/profile-pic-placeholder.png'
import { Button } from '@/components/ui/button';
import {BiCopy, BiDownload} from 'react-icons/bi'
import Link from 'next/link';
import CopyToClipboardButton from '@/components/Clipboard';
import { Toaster } from 'sonner';

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {

  const session = await getServerSession(authOptions);

  const files = await prisma.file.findMany({
    orderBy: {id: "desc"},
    include: {user: true}
  })

  return (
    <div className='py-12 px-8'>
      <div className="max-w-7xl flex flex-col gap-8 mx-auto ">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium">Welcome back, <span className="font-semibold">{session?.user.name}</span>😎</h1>
          <Time/>
        </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <AdminCard
              title='Create a new place'
              description='Add a new place effortlessly using the intuitive UI.'
              href='/admin/create-place'
              gradient
              />

              <AdminCard
              title='Upload a new file'
              description='Transfer a new file to edgestore using the input below.'
              >
                <Upload session={session} />
              </AdminCard>

              <AdminCard
              title='Configure the AI'
              description="Shape the AI's settings to your liking using the options."
              href='/admin/ai'
              gradient2
              />
          </div>

          <h1 className="text-3xl font-semibold">Uploaded Files</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((image) => (
            <div key={image.id} className='flex flex-col gap-4 rounded-xl p-10 bg-primary/10 mx-auto w-full'>
              <div className="relative group w-full h-80 overflow-hidden aspect-square rounded-lg">
              <div className='z-20 absolute flex flex-col gap-2 top-0 left-0 rounded-lg bg-black/40 dark:bg-black/60 group-hover:backdrop-blur w-full h-full items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200'>
                <CopyToClipboardButton textToCopy={image.fileUrl} buttonText='Copy link to clipboard'/>
              </div>
                <Image fill className='object-cover' alt='File' src={image.fileUrl}/>
              </div>
              <div className='flex gap-2 items-center font-medium'>
                <div className="relative overflow-hidden w-10 h-10 aspect-square rounded-full">
                  <Image fill className='object-cover' alt='File' src={image.user.image || ProfileImg}/>
                </div>
                <h1>{image.user.name}</h1>
                <Link className='ml-auto' href={image.downloadUrl}>
                  <Button className='gap-2'><BiDownload/>Download</Button>
                </Link>
              </div>
            </div>
          ))}
          </div>
          <Toaster closeButton richColors/>

        </div>
    </div>
  );
}
